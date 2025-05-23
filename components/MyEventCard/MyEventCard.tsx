import React, { useEffect, useState } from 'react';
import { fetchFacilityById } from '@/api/supabase/queries/facilities';
import LocPin from '@/public/images/gray_loc_pin.svg';
import COLORS from '@/styles/colors';
import { Event, Facilities } from '@/types/schema';
import facilityTypeToPhoto from '@/utils/facilityTypeToPhoto';
import formatTime from '@/utils/formatTime';
import * as styles from './styles';

export default function MyEventCard(eventData: Event) {
  const [facility, setFacility] = useState<Facilities>();

  useEffect(() => {
    fetchFacilityById(eventData.facility_id).then(facilityData => {
      setFacility(facilityData);
    });
  }, [eventData.facility_id]);

  const formattedTime = formatTime(
    new Date(eventData.start_date_time),
    new Date(eventData.end_date_time),
    false,
    true,
  );

  if (!facility) return null;

  return (
    <styles.EventContainer>
      <styles.EventCardContainer>
        <styles.EventImage>
          {facilityTypeToPhoto(facility.type)}
        </styles.EventImage>
        <styles.EventInfoContainer>
          <styles.TimeText
            $fontWeight="400"
            $color={COLORS.gray11}
            $align="left"
          >
            {formattedTime}
          </styles.TimeText>
          <styles.EventDescriptionText
            $fontWeight="500"
            $color="#000"
            $align="left"
          >
            {facility?.name}
          </styles.EventDescriptionText>
          <styles.LocationText
            $fontWeight="400"
            $color={COLORS.gray10}
            $align="left"
          >
            <styles.LPImage src={LocPin} alt="Location Pin" />
            {facility
              ? `${facility.street_address_1}, ${facility.city}`
              : 'Fetching location...'}
          </styles.LocationText>
        </styles.EventInfoContainer>
      </styles.EventCardContainer>
    </styles.EventContainer>
  );
}
