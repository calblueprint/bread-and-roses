'use client';

import React, { useEffect, useState } from 'react';
import { fetchAllActiveEvents } from '@/api/supabase/queries/events';
import EventListingCard from '@/components/EventListingCard/EventListingCard';
import MenuBar from '@/components/MenuBar/MenuBar';
import { H6, SMALL } from '@/styles/text';
import { Event } from '@/types/schema';
import {
  Discover,
  DiscoverHolder,
  EventListingDiv,
  Page,
  SearchBar,
  TitleBar,
} from './styles';

export default function ActiveEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [menuExpanded, setMenuExpanded] = useState(false); // Track the expanded state of the menu

  useEffect(() => {
    const getActiveEvents = async () => {
      const fetchedActiveEvents: Event[] = await fetchAllActiveEvents();
      setEvents(fetchedActiveEvents);
    };
    getActiveEvents();
  }, []);

  return (
    <div>
      <MenuBar setMenuExpanded={setMenuExpanded} />
      <Page $menuExpanded={menuExpanded}>
        <DiscoverHolder>
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
              <EventListingCard
                key={event.event_id}
                id={event.event_id}
                performance_type={event.performance_type}
              />
            ))}
          </EventListingDiv>
        </DiscoverHolder>
      </Page>
    </div>
  );
}
