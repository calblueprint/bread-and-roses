'use client';

import React, { useEffect, useState } from 'react';
import { fetchAllEvents } from '../../api/supabase/queries/events';
import MyEventCard from '../../components/MyEventCard';
import { Event } from '../../types/schema';
import * as styles from './page.style';

export default function EventPage() {
  const [data, setData] = useState<Event[]>([]);

  useEffect(() => {
    fetchAllEvents().then(eventsData => {
      setData(eventsData ?? []);
    });
  }, []);

  return (
    <styles.Page>
      <styles.Title>Upcoming Events</styles.Title>
      {data.map(d => (
        <MyEventCard key={d.event_id} {...d} />
      ))}
    </styles.Page>
  );
}
