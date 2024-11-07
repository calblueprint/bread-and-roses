import React, { useEffect, useState } from 'react';
import { fetchFacilityByID } from '@/api/supabase/queries/facility';
import BPLogo from '@/public/images/bp-logo.png';
import LocPin from '@/public/images/gray_loc_pin.svg';
import COLORS from '@/styles/colors';
import { Event, Facilities } from '@/types/schema';
import formatTime from '@/utils/formatTime';
import * as styles from './styles';

export default function MyEventCard(eventData: Event) {
  const [facility, setFacility] = useState<Facilities>();

  useEffect(() => {
    fetchFacilityByID(eventData.facility_id).then(facilityData => {
      setFacility(facilityData);
    });
  }, [eventData.facility_id]);

  const formattedTime = formatTime(
    new Date(eventData.start_date_time),
    new Date(eventData.end_date_time),
    false,
  );

  return (
    <styles.EventContainer>
      <styles.EventCardContainer>
        <styles.EventImage src={BPLogo} alt="Event Image" />
        <div>
          <styles.TimeText $fontWeight="400" $color="#000" $align="left">
            {formattedTime}
          </styles.TimeText>
          <styles.EventDescriptionText
            $fontWeight="500"
            $color="#000"
            $align="left"
          >
            placeholder
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
        </div>
      </styles.EventCardContainer>
    </styles.EventContainer>
  );
}
