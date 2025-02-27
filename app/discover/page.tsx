'use client';

import React, { useEffect, useState } from 'react';
import { fetchAllActiveEvents } from '@/api/supabase/queries/events';
import DiscoverCard from '@/components/DiscoverCard/DiscoverCard';
import MenuBar from '@/components/MenuBar/MenuBar';
import { H6, SMALL } from '@/styles/text';
import { Event } from '@/types/schema';
import {
  Discover,
  DiscoverCardContainer,
  DiscoverHolder,
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
          <DiscoverCardContainer>
            {events.length > 0
              ? events.map(event => (
                  <DiscoverCard key={event.event_id} event={event} />
                ))
              : null}
          </DiscoverCardContainer>
        </DiscoverHolder>
      </Page>
    </div>
  );
}
