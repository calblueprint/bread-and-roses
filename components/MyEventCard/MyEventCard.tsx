import React from 'react';
import BPLogo from '@/assets/images/bp-logo.png';
import LocPin from '@/public/images/gg_pin.svg';
import COLORS from '@/styles/colors';
import { Event } from '@/types/schema';
import * as styles from './style';

export default function MyEventCard(eventData: Event) {
  const eventStart = new Date(eventData.start_date_time);
  const eventEnd = new Date(eventData.end_date_time);

  // function to remove 00 from time if time is on the hour, ex: 4:00 PM -> 4 PM
  const formatTime = (date: Date) => {
    const minutes = date.getMinutes();

    return minutes === 0
      ? date.toLocaleTimeString([], { hour: 'numeric', hour12: true })
      : date.toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });
  };

  const startTime = formatTime(eventStart);
  const endTime = formatTime(eventEnd);

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const monthText = monthNames[eventStart.getMonth()];

  return (
    <styles.EventContainer>
      <styles.EventCardContainer>
        <styles.BPImage src={BPLogo} alt="Blueprint Logo" />
        <div>
          <styles.TimeText $fontWeight="400" $color="#000" $align="left">
            {monthText} {eventStart.getDate()}, {startTime} - {endTime}
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
            <styles.LPImage src={LocPin} alt="LocPin" />
            placeholder
          </styles.LocationText>
        </div>
      </styles.EventCardContainer>
    </styles.EventContainer>
  );
}
