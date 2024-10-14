'use client';

import React, { useEffect, useState } from 'react';
import { H3 } from '@/styles/text';
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
    <div>
      <H3 $fontWeight="500"> Discover </H3>
      <EventListingDiv>
        {events.map(event => (
          <EventListingCard key={event.event_id} id={event.event_id} />
        ))}
      </EventListingDiv>
    </div>
  );
}
