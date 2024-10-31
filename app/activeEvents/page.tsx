'use client';

import React, { useEffect, useState } from 'react';
import { fetchAllActiveEvents } from '@/api/supabase/queries/events';
import EventListingCard from '@/components/EventListingCard/EventListingCard';
import { H6, SMALL } from '@/styles/text';
import { Event } from '@/types/schema';
import {
  Container,
  Discover,
  EventListingDiv,
  SearchBar,
  TitleBar,
} from './styles';

function MenuBar() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z"
        fill="#621D1E"
      />
    </svg>
  );
}
export default function Page() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const getActiveEvents = async () => {
      const fetchedActiveEvents: Event[] = await fetchAllActiveEvents();
      setEvents(fetchedActiveEvents);
    };
    getActiveEvents();
  }, []);

  return (
    <Container>
      {MenuBar()}
      <Discover $fontWeight="500"> Discover </Discover>
      <SearchBar>
        <SMALL> Search... </SMALL>
      </SearchBar>
      <TitleBar>
        <H6 $fontWeight="500"> Near You </H6>
        <SMALL $color="purple"> show all </SMALL>
      </TitleBar>
      <EventListingDiv>
        {events.map(event => (
          <EventListingCard key={event.event_id} performance_type={event.performance_type} />
        ))}
      </EventListingDiv>
    </Container>
  );
}
