'use client';

import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  fetchAllAvailabilities,
  fetchDatesByAvailabilityID,
} from '@/api/supabase/queries/availability';
import AvailabilityCard from '@/components/AvailabilityCard/AvailabilityCard';
import MenuBar from '@/components/MenuBar/MenuBar';
import Add from '@/public/images/add.svg';
import COLORS from '@/styles/colors';
import { H3 } from '@/styles/text';
import { Availabilities, AvailableDates } from '@/types/schema';
import { AvailabilityContext } from '@/utils/availabilityContext';
import * as styles from './styles';

type AvailabilitiesByYear = {
  [year: string]: {
    availability: Availabilities;
    available_dates: AvailableDates[];
  }[];
};

export default function AvailabilityPage() {
  const router = useRouter();
  const [groupedByYear, setGroupedByYear] = useState<AvailabilitiesByYear>({});
  const [isLoading, setIsLoading] = useState(true);
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [popupType, setPopupType] = useState<string>('');
  const availabilityContext = useContext(AvailabilityContext);

  useEffect(() => {
    async function fetchAndGroupData() {
      try {
        const availabilities = await fetchAllAvailabilities();
        if (!availabilities) return;

        const grouped: AvailabilitiesByYear = {};
        for (const availability of availabilities) {
          const availableDates = await fetchDatesByAvailabilityID(
            availability.availability_id,
          );
          const year = availableDates?.[0]?.start_date_time
            ? new Date(availableDates[0].start_date_time)
                .getFullYear()
                .toString()
            : null;

          if (year == null) continue;

          if (!grouped[year]) {
            grouped[year] = [];
          }

          grouped[year].push({
            availability,
            available_dates: availableDates ?? [],
          });
        }

        for (const year in grouped) {
          grouped[year].sort((a, b) => {
            const firstDateA = new Date(
              a.available_dates[0]?.start_date_time ?? 0,
            ).getTime();
            const firstDateB = new Date(
              b.available_dates[0]?.start_date_time ?? 0,
            ).getTime();
            return firstDateA - firstDateB;
          });
        }

        setGroupedByYear(grouped);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchAndGroupData();
  }, []);

  // ✅ Handle success or failure popup notification
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');

    if (success === 'true') {
      setPopupMessage('Your availability has been added.');
      setPopupType('success');
    } else if (success === 'false') {
      setPopupMessage('Error submitting your availability.');
      setPopupType('error');
    } else if (success === 'edited') {
      setPopupMessage('Your availability has been updated!');
      setPopupType('edited');
    }

    if (success) {
      // Hide the notification after 5 seconds
      setTimeout(() => {
        setPopupMessage(null);
        setPopupType('');
        router.replace('/availability/general', undefined);
      }, 5000);
    }
  }, [router]);

  if (!availabilityContext) return null;
  const { setGeneralInfo, setDays, setTimes } = availabilityContext;

  const clearEditContext = () => {
    setGeneralInfo({
      eventName: '',
      additionalInfo: '',
      facilityId: '',
    });
    setDays([]);
    setTimes({});
  };

  return (
    <div>
      <MenuBar setMenuExpanded={setMenuExpanded} />
      <styles.Page $menuExpanded={menuExpanded}>
        {popupMessage && (
          <styles.PopUpDiv type={popupType}>
            {popupMessage}
            <styles.PopUpButton onClick={() => setPopupMessage(null)}>
              ✖
            </styles.PopUpButton>
          </styles.PopUpDiv>
        )}

        <styles.AllAvailabilitiesHolder>
          <styles.TitleContainer>
            <H3 $fontWeight="500" $color="#000" $align="left">
              Availabilities
            </H3>
            <Link href="/availability/details" onClick={clearEditContext}>
              <styles.AddImage src={Add} alt="add icon" />
            </Link>
          </styles.TitleContainer>
          {isLoading ? (
            <styles.message
              $fontWeight="400"
              $color={COLORS.gray11}
              $align="center"
            >
              Loading availabilities...
            </styles.message>
          ) : Object.keys(groupedByYear).length === 0 ? (
            <styles.message
              $fontWeight="400"
              $color={COLORS.gray11}
              $align="center"
            >
              No availabilities yet, <br /> add one with the plus sign!
            </styles.message>
          ) : (
            Object.entries(groupedByYear).map(([year, availabilities]) => (
              <div key={year}>
                <styles.YearText $fontWeight="500" $color="#000" $align="left">
                  {year}
                </styles.YearText>
                {availabilities.map(({ availability, available_dates }) => (
                  <AvailabilityCard
                    key={availability.availability_id}
                    availability={availability}
                    availableDates={available_dates}
                  />
                ))}
              </div>
            ))
          )}
        </styles.AllAvailabilitiesHolder>
      </styles.Page>
    </div>
  );
}
