'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
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
import * as styles from './styles';

type AvailabilitiesByYear = {
  [year: string]: {
    availability: Availabilities;
    available_dates: AvailableDates[];
  }[];
};

export default function AvailabilityPage() {
  const [groupedByYear, setGroupedByYear] = useState<AvailabilitiesByYear>({});
  const [isLoading, setIsLoading] = useState(true);
  const [menuExpanded, setMenuExpanded] = useState(false); // Track the expanded state of the menu

  useEffect(() => {
    async function fetchAndGroupData() {
      try {
        // Step 1: Fetch all availabilities
        const availabilities = await fetchAllAvailabilities();

        if (!availabilities) {
          return;
        }

        // Step 2: Group by year while fetching associated dates
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

          //don't display availability cards that have no availabilities associated
          if (year == null) {
            continue;
          }

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
        setIsLoading(false); // Stop loading after data fetch
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchAndGroupData();
  }, []);

  return (
    <div>
      <MenuBar setMenuExpanded={setMenuExpanded} />{' '}
      {/* Pass function to update state */}
      <styles.Page $menuExpanded={menuExpanded}>
        <styles.AllAvailabilitiesHolder>
          <styles.TitleContainer>
            <H3 $fontWeight="500" $color="#000" $align="left">
              Availabilities
            </H3>
            <Link href={`/availability/details`}>
              <styles.AddImage src={Add} alt="add icon" />
            </Link>
          </styles.TitleContainer>
          {/* Check if there are no availabilities */}
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
              No availabilities yet,
              <br />
              add one with the plus sign!
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
