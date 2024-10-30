'use client';

import React, { useEffect, useState } from 'react';
import MyEventCard from '@/components/MyEventCard/MyEventCard';
import Menu from '@/public/images/ic_baseline-menu.svg';
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

  // Sort the events by month
  const sortedEntries = Object.entries(eventsByMonth).sort((a, b) => {
    const dateA = new Date(a[0]); // Month Year string from a
    const dateB = new Date(b[0]); // Month Year string from b
    return dateA.getTime() - dateB.getTime(); // Compare timestamps
  });

  // Sort events within each month by their start date
  sortedEntries.forEach(([, events]) => {
    events.sort((a, b) => {
      return (
        new Date(a.start_date_time).getTime() -
        new Date(b.start_date_time).getTime()
      );
    });
  });

  return (
    <styles.Page>
      <styles.Image src={Menu} alt="Back icon" />
      <styles.AllEventsHolder>
        <styles.Title $fontWeight="500" $color="#000" $align="left">
          Upcoming Events
        </styles.Title>
        {sortedEntries.map(([month, events]) => (
          <div key={month}>
            <styles.MonthYear $fontWeight="500" $color="#000" $align="left">
              {month}
            </styles.MonthYear>
            {events.map(event => (
              <MyEventCard key={event.event_id} {...event} />
            ))}
          </div>
        ))}
      </styles.AllEventsHolder>
    </styles.Page>
  );
}
