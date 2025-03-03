'use client';

import React, { useEffect, useState } from 'react';
import {
  fetchAllActiveEvents,
  fetchAllActiveEventsBySearch,
} from '@/api/supabase/queries/events';
import DiscoverCard from '@/components/DiscoverCard/DiscoverCard';
import MenuBar from '@/components/MenuBar/MenuBar';
import Filter from '@/public/images/filter.svg';
import SadIcon from '@/public/images/sad.svg';
import SearchIcon from '@/public/images/search_icon.svg';
import { Event } from '@/types/schema';
import {
  Discover,
  DiscoverCardContainer,
  DiscoverHolder,
  FilterIcon,
  Found,
  Icon,
  NearYou,
  NoMatchContainer,
  NoMatchText,
  Page,
  SearchBar,
  SearchInput,
  ShowAllText,
  TitleBar,
} from './styles';

export default function ActiveEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [isSearchActive, setSearchActive] = useState<boolean>(false);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [menuExpanded, setMenuExpanded] = useState(false); // Track the expanded state of the menu

  const getFilteredEvents = async () => {
    setIsFiltering(true);
    const filteredEvents: Event[] =
      await fetchAllActiveEventsBySearch(searchInput);
    setFilteredEvents(filteredEvents);
    setIsFiltering(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  /* Only make additional fetchAllActiveEvents calls when filtering is needed */
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!searchInput) {
        setSearchActive(false);
        setFilteredEvents(events);
      } else {
        setSearchActive(true);
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

  const noMatches = isSearchActive && filteredEvents.length === 0;

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
          <FilterIcon src={Filter} alt="Filter icon" />
          <TitleBar>
            {isSearchActive ? (
              filteredEvents.length === 0 || isFiltering ? null : (
                /* Don't show filteredEvents.length until events are finished loading, to prevent flickering from old -> new length */
                <Found>Found {filteredEvents.length} matches</Found>
              )
            ) : (
              <NearYou>Near You</NearYou>
            )}
            {/* Hide ShowAllText while fetching filteredEvents to prevent it from shifting to 
            the left when there is no Found.. or Near You.. text  */}
            <ShowAllText $hidden={noMatches || isFiltering}>
              {' '}
              show all{' '}
            </ShowAllText>
          </TitleBar>
          <DiscoverCardContainer $search={isSearchActive}>
            {noMatches ? (
              <NoMatchContainer>
                <NoMatchText>No matches</NoMatchText>
                <Icon src={SadIcon} alt="Sad face icon" />
              </NoMatchContainer>
            ) : !isFiltering ? (
              filteredEvents.map(event => (
                <DiscoverCard
                  search={isSearchActive}
                  key={event.event_id}
                  event={event}
                />
              ))
            ) : null}
          </DiscoverCardContainer>
        </DiscoverHolder>
      </Page>
    </div>
  );
}
