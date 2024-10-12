'use client';

import React, { useEffect, useState } from 'react';
import { fetchAllActiveEvents } from '../../api/supabase/queries/events';
import EventListingCard from '../../components/EventListingCard/EventListingCard';
import { Event } from '../../types/schema';
import { EventListingDiv } from './styles';

export default function Page() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const getActiveEvents = async () => {
      const fetchedActiveEvents: Event[] = await fetchAllActiveEvents();
      setEvents(fetchedActiveEvents);
    };
    getActiveEvents();
  }, [events]);

  return (
    <EventListingDiv>
      {events.map(event => (
        <EventListingCard key={event.event_id} id={event.event_id} />
      ))}
    </EventListingDiv>
  );
}
