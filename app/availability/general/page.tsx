'use client';

import React, { useEffect, useState } from 'react';
import {
  fetchAllAvailabilities,
  fetchDatesByAvailabilityID,
} from '@/api/supabase/queries/availability';
import AvailabilityCard from '@/components/AvailabilityCard/AvailabilityCard';
import MenuBar from '@/components/MenuBar/MenuBar';
import Add from '@/public/images/add.svg';
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

  useEffect(() => {
    async function fetchAndGroupData() {
      try {
        // Step 1: Fetch all availabilities
        const availabilities = await fetchAllAvailabilities();

        if (!availabilities) {
          console.error('Failed to fetch availabilities');
          return;
        }

        // Step 2: Group by year while fetching associated dates
        const grouped: AvailabilitiesByYear = {};
        for (const availability of availabilities) {
          const availableDates = await fetchDatesByAvailabilityID(
            availability.availability_id,
          );

          const year = availableDates?.[0]?.available_date
            ? new Date(availableDates[0].available_date)
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

        setGroupedByYear(grouped);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchAndGroupData();
  }, []);

  return (
    <div>
      <MenuBar />
      <styles.Page>
        <styles.AllAvailabilitiesHolder>
          <styles.TitleContainer>
            <H3 $fontWeight="500" $color="#000" $align="left">
              Availabilities
            </H3>
            <styles.AddImage src={Add} alt="add icon" />
          </styles.TitleContainer>
          {/* Render grouped availabilities */}
          {Object.entries(groupedByYear).map(([year, availabilities]) => (
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
          ))}
        </styles.AllAvailabilitiesHolder>
      </styles.Page>
    </div>
  );
}
