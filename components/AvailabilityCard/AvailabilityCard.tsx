import React from 'react';
import Arrow from '@/public/images/white_back.svg';
import COLORS from '@/styles/colors';
import { H5, P } from '@/styles/text';
import { Availabilities, AvailableDates } from '@/types/schema';
import * as styles from './styles';

interface AvailabilityCardProps {
  availability: Availabilities;
  availableDates: AvailableDates[];
}

export default function AvailabilityCard({
  availability,
  availableDates,
}: AvailabilityCardProps) {
  const dateRange =
    availableDates.length > 0
      ? {
          earliest: new Date(
            Math.min(
              ...availableDates.map(time =>
                new Date(time.start_date_time).valueOf(),
              ),
            ),
          ),
          latest: new Date(
            Math.max(
              ...availableDates.map(time =>
                new Date(time.start_date_time).valueOf(),
              ),
            ),
          ),
        }
      : null;

  // Format the dates
  let formattedRange = dateRange
    ? `${dateRange.earliest.toLocaleString('default', {
        month: 'short',
        day: 'numeric',
      })} - ${dateRange.latest.toLocaleString('default', {
        month: 'short',
        day: 'numeric',
      })}`
    : 'No dates available';

  if (
    dateRange &&
    dateRange.earliest.getUTCDate() == dateRange.latest.getUTCDate() &&
    dateRange.earliest.getUTCMonth() == dateRange.latest.getUTCMonth() &&
    dateRange.earliest.getUTCFullYear() == dateRange.latest.getUTCFullYear()
  ) {
    formattedRange = `${dateRange.earliest.toLocaleString('default', {
      month: 'short',
      day: 'numeric',
    })}`;
  }

  return (
    <styles.StyledLink href={`/availability/${availability.availability_id}`}>
      <styles.AvailabilityContainer>
        <styles.AvailabilityHeader>
          <styles.AvailabilityTitle>
            <H5 $fontWeight="500" $color={COLORS.bread1} $align="left">
              {availability.name}
            </H5>
            <P $fontWeight="400" $color={COLORS.gray4} $align="left">
              {formattedRange}
            </P>
          </styles.AvailabilityTitle>
          <styles.Arrow src={Arrow} alt="arrow" />
        </styles.AvailabilityHeader>
        <styles.Content>
          <div>
            <styles.SubHeader>
              <P $fontWeight="500" $color={COLORS.gray12} $align="left">
                Description
              </P>
              <styles.TruncatedText
                $fontWeight="400"
                $color={COLORS.gray11}
                $align="left"
              >
                {availability.additional_info}
              </styles.TruncatedText>
            </styles.SubHeader>
          </div>
        </styles.Content>
      </styles.AvailabilityContainer>
    </styles.StyledLink>
  );
}
