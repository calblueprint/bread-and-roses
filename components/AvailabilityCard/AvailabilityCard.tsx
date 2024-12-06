import React from 'react';
import AdditionalInfo from '@/public/images/additionalinfo.svg';
import Clock from '@/public/images/clock.svg';
import COLORS from '@/styles/colors';
import { P, SMALL } from '@/styles/text';
import { Availabilities, AvailableDates } from '@/types/schema';
import * as styles from './styles';

interface AvailabilityCardProps {
  availability: Availabilities;
  availableDates: AvailableDates[];
}

function formatTimeString(startTime: string, endTime: string): string {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const formattedStartTime = timeFormatter.format(start);
  const formattedEndTime = timeFormatter.format(end);

  return `${formattedStartTime} - ${formattedEndTime}`;
}

// Function to group availableDates by day and merge time ranges
function groupByDate(availableDates: AvailableDates[]) {
  const grouped: { [date: string]: AvailableDates[] } = {};

  availableDates.forEach(date => {
    const formattedDate = new Date(date.available_date).toLocaleDateString(
      'en-US',
      {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      },
    );

    if (!grouped[formattedDate]) {
      grouped[formattedDate] = [];
    }

    grouped[formattedDate].push(date);
  });

  return grouped;
}

// Function to format the grouped dates into the desired format
function formatGroupedDates(grouped: { [date: string]: AvailableDates[] }) {
  // Sort grouped dates by actual date (chronologically)
  const sortedGroupedDates = Object.entries(grouped).sort((a, b) => {
    const dateA = new Date(a[0]);
    const dateB = new Date(b[0]);
    return dateA.getTime() - dateB.getTime(); // Ensures chronological order
  });

  return sortedGroupedDates.map(([date, dates]) => {
    // Sort the dates' time ranges within the same day
    const sortedTimes = dates.sort((a, b) => {
      const startA = new Date(a.test_col).getTime();
      const startB = new Date(b.test_col).getTime();
      return startA - startB; // Sort time ranges in chronological order
    });

    // Format time ranges for the day
    const timeRanges = sortedTimes
      .map(date => formatTimeString(date.test_col, date.test_col2))
      .join(', ');

    return { date, timeRanges };
  });
}

export default function AvailabilityCard({
  availability,
  availableDates,
}: AvailabilityCardProps) {
  // Step 1: Group dates by the same day
  const groupedDates = groupByDate(availableDates);

  // Step 2: Format grouped dates into a usable structure
  const formattedGroupedDates = formatGroupedDates(groupedDates);

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

          {/* Render the grouped availability times for each day */}
          <styles.Ul>
            {formattedGroupedDates.map(({ date, timeRanges }) => (
              <styles.Li key={date}>
                <SMALL $fontWeight="400" $color={COLORS.gray11} $align="left">
                  {date}: {timeRanges}
                </SMALL>
              </styles.Li>
            ))}
          </styles.Ul>
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
