'use client';

import React, { useEffect, useState } from 'react';
import { fetchAllActiveEventsByFilter } from '@/api/supabase/queries/events';
import DiscoverCard from '@/components/DiscoverCard/DiscoverCard';
import FilterMenu from '@/components/FilterMenu/FilterMenu';
import MenuBar from '@/components/MenuBar/MenuBar';
import Back from '@/public/images/back.svg';
import Cancel from '@/public/images/cancel.svg';
import Filter from '@/public/images/filter.svg';
import SadIcon from '@/public/images/sad.svg';
import SearchIcon from '@/public/images/search_icon.svg';
import { Event } from '@/types/schema';
import {
  Button,
  Discover,
  DiscoverCardContainer,
  DiscoverHolder,
  FilterMenuContainer,
  FilterRow,
  FilterTag,
  FilterTagContainer,
  FilterWrapper,
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
  XIcon,
} from './styles';

const facilityTypeOptions = new Set([
  'Assisted Living',
  "Children's Day Care",
  'Detention Center',
  'Developmentally Disabled',
  'Food Bank',
  'Homeless Services',
  'Hospital',
  'Mental Health Services',
  'Recovery Center',
  'Senior Day Program',
  'Skilled Nursing Care',
  'Special Needs School',
  'Visually Impaired',
]);

const locationOptions = new Set([
  'Alameda',
  'Contra Costa',
  'Marin',
  'Napa',
  'San Francisco',
  'San Mateo',
  'Santa Clara',
  'Sonoma',
]);

const hostOptions = new Map<string, boolean>([
  ['Has Host', false],
  ['No Host', true],
]);

export interface EventWithFacility extends Event {
  facilities: {
    county: string;
    type: string;
  };
}

export default function ActiveEventsPage() {
  const [events, setEvents] = useState<EventWithFacility[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventWithFacility[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [isSearchActive, setSearchActive] = useState<boolean>(false);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [menuExpanded, setMenuExpanded] = useState(false); // Track the expanded state of the menu
  const [filterMenuExpanded, setFilterMenuExpanded] = useState(false);
  const [facilityFilters, setFacilityFilters] = useState(new Set<string>());
  const [countyFilters, setCountyFilters] = useState(new Set<string>());
  const [hostFilters, setHostFilters] = useState(new Set<string>());

  const getSearchEvents = async () => {
    setIsFiltering(true);
    const filtered: EventWithFacility[] =
      await fetchAllActiveEventsByFilter(searchInput);
    setFilteredEvents(filtered);
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
        getSearchEvents();
      }
    }
  };

  const handleClearFilters = () => {
    setFacilityFilters(new Set());
    setCountyFilters(new Set());
    setHostFilters(new Set());
    applyFilters(new Set(), new Set(), new Set());
  };

  const applyFilters = (
    newFacilityFilters: Set<string>,
    newCountyFilters: Set<string>,
    newHostFilters: Set<string>,
  ) => {
    setSearchActive(
      !!(
        newFacilityFilters.size ||
        newCountyFilters.size ||
        newHostFilters.size
      ),
    );
    setIsFiltering(true);

    /* Check if the filter has any match in its category */
    const checkMatch = (value: string, filters: Set<string>) => {
      if (filters.size > 0) {
        return filters.has(value);
      }
      return true;
    };

    const filtered = events.filter(event => {
      const facilityTypeMatch = checkMatch(
        event.facilities.type,
        newFacilityFilters,
      );
      const countyMatch = checkMatch(event.facilities.county, newCountyFilters);
      const hostMatch = checkMatch(
        event.needs_host ? 'Has Host' : 'No Host',
        newHostFilters,
      );
      return facilityTypeMatch && countyMatch && hostMatch;
    });

    setFilteredEvents(filtered);
    setIsFiltering(false);
  };

  const handleApplyClick = () => {
    applyFilters(facilityFilters, countyFilters, hostFilters);
    setFilterMenuExpanded(false);
  };

  const handleFilterClick = () => {
    setFilterMenuExpanded(!filterMenuExpanded);
  };

  const handleRemoveFilter = (filter: string) => {
    /* Find filter's category and remove it */
    const newFacilityFilters = new Set(facilityFilters);
    const newCountyFilters = new Set(countyFilters);
    const newHostFilters = new Set(hostFilters);

    if (facilityFilters.has(filter)) newFacilityFilters.delete(filter);
    if (countyFilters.has(filter)) newCountyFilters.delete(filter);
    if (hostFilters.has(filter)) newHostFilters.delete(filter);

    /* Update the filters */
    setFacilityFilters(newFacilityFilters);
    setCountyFilters(newCountyFilters);
    setHostFilters(newHostFilters);

    /* Reapply new filters */
    applyFilters(newFacilityFilters, newCountyFilters, newHostFilters);
  };

  /* Render all events on page mount */
  useEffect(() => {
    const getAllActiveEvents = async () => {
      const fetchedActiveEvents: EventWithFacility[] =
        await fetchAllActiveEventsByFilter('');
      setEvents(fetchedActiveEvents);
      setFilteredEvents(fetchedActiveEvents);
    };
    getAllActiveEvents();
  }, []);

  const noMatches = isSearchActive && filteredEvents.length === 0;
  const allFilters = new Set([
    ...facilityFilters,
    ...countyFilters,
    ...hostFilters,
  ]);

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
          <FilterWrapper>
            {filterMenuExpanded ? (
              <FilterRow>
                <Button type="button" onClick={handleFilterClick}>
                  <Icon src={Back} alt="Back icon" />
                </Button>
                <FilterMenuContainer>
                  <FilterMenu
                    filters={[
                      {
                        placeholder: 'Facility Type',
                        options: facilityTypeOptions,
                        value: facilityFilters,
                        onChange: newValue => setFacilityFilters(newValue),
                      },
                      {
                        placeholder: 'County',
                        options: locationOptions,
                        value: countyFilters,
                        onChange: newValue => setCountyFilters(newValue),
                      },
                      {
                        placeholder: 'Host Status',
                        options: new Set(hostOptions.keys()),
                        value: hostFilters,
                        onChange: newValue => setHostFilters(newValue),
                      },
                    ]}
                    onClear={handleClearFilters}
                    onApply={handleApplyClick}
                  />
                </FilterMenuContainer>
              </FilterRow>
            ) : (
              <FilterRow>
                <Button onClick={handleFilterClick}>
                  <Icon src={Filter} alt="Filter icon" />
                </Button>
                <FilterTagContainer>
                  {[...allFilters].map((filter, index) => (
                    <FilterTag key={index}>
                      {filter}
                      <Button onClick={() => handleRemoveFilter(filter)}>
                        <XIcon src={Cancel} alt="Cancel icon" />
                      </Button>
                    </FilterTag>
                  ))}
                </FilterTagContainer>
              </FilterRow>
            )}
          </FilterWrapper>
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
