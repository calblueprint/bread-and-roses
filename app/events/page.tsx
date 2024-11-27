'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { cachedEvents } from '@/app/events/eventscache';
import MenuBar from '@/components/MenuBar/MenuBar';
import MyEventCard from '@/components/MyEventCard/MyEventCard';
import { Event } from '@/types/schema';
import * as styles from './styles';

type GroupedEvents = {
  [monthYear: string]: Event[]; // Each key is a "Month Year" string, and the value is an array of Events
};

export default function EventPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useMemo(() => {
    cachedEvents('11d219d9-bf05-4a06-a23e-89fd566c7a04').then(
      //placeholder user id
      eventsData => {
        setEvents(eventsData ?? []);
      },
    );
  }, []);

  const groupEventsByMonth = (events: Event[]) => {
    return events.reduce((acc: GroupedEvents, event) => {
      const eventDate = new Date(event.start_date_time);
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

  const eventsByMonth = groupEventsByMonth(events);

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
    <div>
      <MenuBar />
      <styles.Page>
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
                <Link
                  key={event.event_id}
                  href={`/events/${event.event_id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <MyEventCard key={event.event_id} {...event} />
                </Link>
              ))}
            </div>
          ))}
        </styles.AllEventsHolder>
      </styles.Page>
    </div>
  );
}
