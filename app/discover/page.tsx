'use client';

import React, { useEffect, useState } from 'react';
import { fetchAllActiveEventsByFilter } from '@/api/supabase/queries/events';
import { fetchVolunteerPreferences } from '@/api/supabase/queries/volunteers';
import DiscoverCard from '@/components/DiscoverCard/DiscoverCard';
import FilterMenu from '@/components/FilterMenu/FilterMenu';
import MenuBar from '@/components/MenuBar/MenuBar';
import Back from '@/public/images/back.svg';
import Cancel from '@/public/images/cancel.svg';
import Filter from '@/public/images/filter.svg';
import SadIcon from '@/public/images/sad.svg';
import SearchIcon from '@/public/images/search_icon.svg';
import { Event } from '@/types/schema';
import { useSession } from '@/utils/AuthProvider';
import {
  Button,
  Discover,
  DiscoverCardContainer,
  DiscoverContainer,
  DiscoverHolder,
  FilterMenuContainer,
  FilterRow,
  FilterTag,
  FilterTagContainer,
  FilterWrapper,
  Found,
  Icon,
  Label,
  NoMatchContainer,
  NoMatchText,
  Page,
  RowContainer,
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

interface EventWithFacility extends Event {
  facilities: {
    county: string;
    type: string;
  };
}

interface VolunteerPreferences {
  facility_type: string[];
  locations: string[];
}

export default function ActiveEventsPage() {
  const { session } = useSession();
  const [events, setEvents] = useState<EventWithFacility[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventWithFacility[]>([]);
  const [nearYouEvents, setNearYouEvents] = useState<EventWithFacility[]>([]);
  const [interestBasedEvents, setInterestBasedEvents] = useState<
    EventWithFacility[]
  >([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [isSearchActive, setSearchActive] = useState<boolean>(false);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [menuExpanded, setMenuExpanded] = useState(false); // Track the expanded state of the menu
  const [filterMenuExpanded, setFilterMenuExpanded] = useState(false);
  const [facilityFilters, setFacilityFilters] = useState(new Set<string>());
  const [countyFilters, setCountyFilters] = useState(new Set<string>());
  const [hostFilters, setHostFilters] = useState(new Set<string>());
  const [volunteerPreferences, setVolunteerPreferences] =
    useState<VolunteerPreferences>();

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

  const handleShowAllNearby = () => {
    /* Show volunteers' county filter tags*/
    volunteerPreferences?.locations.forEach(location => {
      setCountyFilters(prevFilters => new Set(prevFilters).add(location));
    });

    /* Show column-filtered events view */
    setSearchActive(nearYouEvents.length > 0);
    setFilteredEvents(nearYouEvents);
  };

  const handleShowAllInterests = () => {
    /* Show volunteers' facility_type filter tags*/
    volunteerPreferences?.facility_type.forEach(facility => {
      setFacilityFilters(prevFilters => new Set(prevFilters).add(facility));
    });

    /* Show column-filered events view */
    setSearchActive(interestBasedEvents.length > 0);
    setFilteredEvents(interestBasedEvents);
  };

  const filterNearby = () => {
    const nearby = events.filter(event =>
      volunteerPreferences?.locations.includes(event.facilities.county),
    );
    setNearYouEvents(nearby);
  };

  const filterFacilityInterest = () => {
    const interests = events.filter(event =>
      volunteerPreferences?.facility_type.includes(event.facilities.type),
    );
    setInterestBasedEvents(interests);
  };

  const filterVolunteerPreferences = () => {
    handleClearFilters();
    filterNearby();
    filterFacilityInterest();
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

      /* Get volunteer preferences from session data */
      if (session?.user?.id) {
        try {
          const { locations, facility_type } = await fetchVolunteerPreferences(
            session.user.id,
          );
          setVolunteerPreferences({ locations, facility_type });
        } catch (error) {
          console.error('Error fetching volunteer preferences:', error);
        }
      }
    };
    getAllActiveEvents();
  }, [session]);

  useEffect(() => {
    if (events.length > 0 && volunteerPreferences) {
      filterVolunteerPreferences();
    }
  }, [events, volunteerPreferences]);

  const noMatches = isSearchActive && filteredEvents.length === 0;
  const showFiltered =
    isSearchActive && !isFiltering && filteredEvents.length > 0;
  const showDefault =
    !isSearchActive &&
    !isFiltering &&
    !filterMenuExpanded &&
    filteredEvents.length > 0 &&
    !noMatches;
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
                <Button onClick={handleFilterClick}>
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
          {noMatches && (
            <NoMatchContainer>
              <NoMatchText>No matches</NoMatchText>
              <Icon src={SadIcon} alt="Sad face icon" />
            </NoMatchContainer>
          )}
          {showDefault && (
            <DiscoverContainer>
              <RowContainer>
                <TitleBar>
                  <Label>Near You</Label>
                  <Button onClick={handleShowAllNearby}>
                    <ShowAllText> show all </ShowAllText>
                  </Button>
                </TitleBar>
                <DiscoverCardContainer $search={isSearchActive}>
                  {nearYouEvents.map(event => (
                    <DiscoverCard
                      search={isSearchActive}
                      key={event.event_id}
                      event={event}
                    />
                  ))}
                </DiscoverCardContainer>
              </RowContainer>
              <RowContainer>
                <TitleBar>
                  <Label>Based on your interests</Label>
                  <Button onClick={handleShowAllInterests}>
                    <ShowAllText> show all </ShowAllText>
                  </Button>
                </TitleBar>
                <DiscoverCardContainer $search={isSearchActive}>
                  {interestBasedEvents.map(event => (
                    <DiscoverCard
                      search={isSearchActive}
                      key={event.event_id}
                      event={event}
                    />
                  ))}
                </DiscoverCardContainer>
              </RowContainer>
            </DiscoverContainer>
          )}
          {/* Filtered Events View */}
          {showFiltered && (
            <RowContainer>
              <TitleBar>
                <Found>Found {filteredEvents.length} matches</Found>
              </TitleBar>
              <DiscoverCardContainer $search={isSearchActive}>
                {filteredEvents.map(event => (
                  <DiscoverCard
                    search={isSearchActive}
                    key={event.event_id}
                    event={event}
                  />
                ))}
              </DiscoverCardContainer>
            </RowContainer>
          )}
        </DiscoverHolder>
      </Page>
    </div>
  );
}
