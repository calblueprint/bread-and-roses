import React from 'react';
import BPLogo from '@/assets/images/bp-logo.png';
import { Event } from '../../types/schema';
import * as styles from './style';

export default function MyEventCard(eventData: Event) {
  const eventStart = new Date(eventData.start_date_time);
  const eventEnd = new Date(eventData.end_date_time);

  const startTime = eventStart.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const endTime = eventEnd.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

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
      <styles.DateContainer>
        <styles.MonthText>{monthText}</styles.MonthText>
        <styles.DateText>{eventStart.getDate()}</styles.DateText>
      </styles.DateContainer>
      <styles.EventCardContainer>
        <div>
          <styles.TimeText>
            {startTime} - {endTime}
          </styles.TimeText>
          <styles.EventDescriptionText>placeholder</styles.EventDescriptionText>
          <styles.LocationText>placeholder</styles.LocationText>
        </div>
        <styles.Image src={BPLogo} alt="Blueprint Logo" />
      </styles.EventCardContainer>
    </styles.EventContainer>
  );
}
