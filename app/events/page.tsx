'use client';

import React, { useEffect, useState } from 'react';
import MyEventCard from '@/components/MyEventCard/MyEventCard';
import { Event } from '@/types/schema';
import { fetchAllEvents } from '../../api/supabase/queries/events';
import * as styles from './page.style';

type GroupedEvents = {
  [monthYear: string]: Event[]; // Each key is a "Month Year" string, and the value is an array of Events
};

export default function EventPage() {
  const [data, setData] = useState<Event[]>([]);

  useEffect(() => {
    fetchAllEvents().then(eventsData => {
      setData(eventsData ?? []);
    });
  }, []);

  const groupEventsByMonth = (events: Event[]) => {
    return events.reduce((acc: GroupedEvents, event) => {
      const eventDate = new Date(event.start_date_time); // Assumes `date` field is in the event object
      const monthYear = eventDate.toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      });

      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(event);
      return acc;
    }, {} as GroupedEvents);
  };

  const eventsByMonth = groupEventsByMonth(data);

  return (
    <styles.Page>
      <styles.Title $fontWeight="500" $color="#000" $align="left">
        Upcoming Events
      </styles.Title>
      {Object.entries(eventsByMonth).map(([month, events]) => (
        <div key={month}>
          <styles.MonthYear $fontWeight="500" $color="#000" $align="left">
            {month}
          </styles.MonthYear>
          {events.map(event => (
            <MyEventCard key={event.event_id} {...event} />
          ))}
        </div>
      ))}
    </styles.Page>
  );
}
