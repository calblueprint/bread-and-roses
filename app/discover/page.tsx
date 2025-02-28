'use client';

import React, { useEffect, useState } from 'react';
import {
  fetchAllActiveEvents,
  fetchAllActiveEventsBySearch,
} from '@/api/supabase/queries/events';
import DiscoverCard from '@/components/DiscoverCard/DiscoverCard';
import MenuBar from '@/components/MenuBar/MenuBar';
import SearchIcon from '@/public/images/search_icon.svg';
import { H6, SMALL } from '@/styles/text';
import { Event } from '@/types/schema';
import {
  Discover,
  DiscoverCardContainer,
  DiscoverHolder,
  Icon,
  Page,
  SearchBar,
  SearchInput,
  TitleBar,
} from './styles';

export default function ActiveEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [menuExpanded, setMenuExpanded] = useState(false); // Track the expanded state of the menu

  const getFilteredEvents = async () => {
    const filteredEvents: Event[] =
      await fetchAllActiveEventsBySearch(searchInput);
    setFilteredEvents(filteredEvents);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  /* Only make additional fetchAllActiveEvents calls when filtering is needed */
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!searchInput) {
        setFilteredEvents(events);
      } else {
        getFilteredEvents();
      }
    }
  };

  /* Render all events on page mount */
  useEffect(() => {
    const getAllActiveEvents = async () => {
      const fetchedActiveEvents: Event[] = await fetchAllActiveEvents();
      setEvents(fetchedActiveEvents);
      setFilteredEvents(fetchedActiveEvents);
    };
    getAllActiveEvents();
  }, []);

  return (
    <div>
      <MenuBar setMenuExpanded={setMenuExpanded} />
      <Page $menuExpanded={menuExpanded}>
        <DiscoverHolder>
          <Discover $fontWeight="500"> Discover </Discover>
          <SearchBar>
            <Icon src={SearchIcon} alt="Search icon" />
            <SearchInput
              placeholder="Search..."
              value={searchInput}
              onChange={handleChange}
              onKeyDown={handleEnter}
            />
          </SearchBar>
          <TitleBar>
            <H6 $fontWeight="500"> Near You </H6>
            <SMALL $color="purple"> show all </SMALL>
          </TitleBar>
          <DiscoverCardContainer>
            {filteredEvents.map(event => (
              <DiscoverCard key={event.event_id} event={event} />
            ))}
          </DiscoverCardContainer>
        </DiscoverHolder>
      </Page>
    </div>
  );
}
