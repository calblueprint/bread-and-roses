import React, { useEffect, useState } from 'react';
import { fetchFacilityById } from '@/api/supabase/queries/facilities';
import AdditionalInfo from '@/public/images/additionalinfo.svg';
import Clock from '@/public/images/clock.svg';
import COLORS from '@/styles/colors';
import { P, SMALL } from '@/styles/text';
import { Availabilities, AvailableDates, Facilities } from '@/types/schema';
import * as styles from './styles';

interface AvailabilityCardProps {
  availability: Availabilities;
  availableDates: AvailableDates[];
}

function formatDateString(
  dateStr: string,
  startTime: string,
  endTime: string,
): string {
  const date = new Date(dateStr);
  const start = new Date(startTime);
  const end = new Date(endTime);

  const dateFormatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });

  const formattedDate = dateFormatter.format(date);
  const formattedStartTime = timeFormatter.format(start);
  const formattedEndTime = timeFormatter.format(end);

  return `${formattedDate}; ${formattedStartTime} - ${formattedEndTime}`;
}

export default function AvailabilityCard({
  availability,
  availableDates,
}: AvailabilityCardProps) {
  return (
    <styles.AvailabilityContainer>
      <styles.AvailabilityTitle
        $fontWeight="500"
        $color={COLORS.bread1}
        $align="left"
      >
        {availability.name}
      </styles.AvailabilityTitle>
      <styles.Content>
        <div>
          <styles.SubHeader>
            <styles.Clock src={Clock} alt="clock" />
            <P $fontWeight="500" $color={COLORS.gray12} $align="left">
              Availabilities
            </P>
          </styles.SubHeader>
          {availableDates.map(date => (
            <div key={date.date_id}>
              <SMALL $fontWeight="400" $color={COLORS.gray11} $align="left">
                &nbsp; •{' '}
                {formatDateString(
                  date.available_date,
                  date.test_col,
                  date.test_col2,
                )}
              </SMALL>
            </div>
          ))}
        </div>
        <div>
          <styles.SubHeader>
            <styles.Clock src={AdditionalInfo} alt="infoicon" />
            <P $fontWeight="500" $color={COLORS.gray12} $align="left">
              Additional Information
            </P>
          </styles.SubHeader>
          <SMALL $fontWeight="400" $color={COLORS.gray11} $align="left">
            {availability.additional_info}
          </SMALL>
        </div>
      </styles.Content>
    </styles.AvailabilityContainer>
  );
}
