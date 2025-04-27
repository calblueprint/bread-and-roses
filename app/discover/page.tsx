'use client';

import React, { useContext, useEffect, useState } from 'react';
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
import X from '@/public/images/x.svg';
import COLORS from '@/styles/colors';
import { P } from '@/styles/text';
import { Event } from '@/types/schema';
import { useSession } from '@/utils/AuthProvider';
import { FilterContext } from '@/utils/filterContext';
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
  ResetButton,
  RowContainer,
  SearchBar,
  SearchInput,
  SearchXIcon,
  ShowAllText,
  TitleBar,
  XIcon,
} from './styles';

const audienceOptions = new Set(['Youth', 'Adult', 'Senior']);

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

const hostOptions = new Map<string, boolean>([['Looking for Hosts', false]]);

const sortOptions = new Set(['Upcoming events']);

interface EventWithFacility extends Event {
  facilities: {
    county: string;
    type: string;
    audience: string[];
  };
}

interface VolunteerPreferences {
  facility_type: string[];
  locations: string[];
}

export default function ActiveEventsPage() {
  const { session } = useSession();
  const [events, setEvents] = useState<EventWithFacility[]>([]);
  const [nearYouEvents, setNearYouEvents] = useState<EventWithFacility[]>([]);
  const [interestBasedEvents, setInterestBasedEvents] = useState<
    EventWithFacility[]
  >([]);
  const [upcomingEvents, setUpcomingEvents] = useState<EventWithFacility[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [menuExpanded, setMenuExpanded] = useState(false); // Track the expanded state of the menu
  const [filterMenuExpanded, setFilterMenuExpanded] = useState(false);
  const [volunteerPreferences, setVolunteerPreferences] =
    useState<VolunteerPreferences>();
  const [isEventsLoaded, setEventsLoaded] = useState(false);
  const filterContext = useContext(FilterContext);

  const getSearchEvents = async () => {
    setIsFiltering(true);
    const searchFiltered: EventWithFacility[] =
      await fetchAllActiveEventsByFilter(searchInput);

    searchFiltered.sort(sortByDate);

    // Apply any active filters to the search results
    const filtered = searchFiltered.filter(event => {
      const facilityTypeMatch = checkFilterMatch(
        event.facilities.type,
        facilityFilters,
      );
      const countyMatch = checkFilterMatch(
        event.facilities.county,
        countyFilters,
      );
      const hostMatch = checkFilterMatch(
        event.needs_host ? 'Looking for Hosts' : 'No Host',
        hostFilters,
      );
      const audienceMatch = checkFilterMatch(
        event.facilities.audience,
        audienceFilters,
      );
      return facilityTypeMatch && countyMatch && hostMatch && audienceMatch;
    });

    setFilteredEvents(filtered);
    setIsFiltering(false);
  };

  // Helper function to check if a value matches any of the filters
  const checkFilterMatch = (
    value: string | string[],
    filters: Set<string>,
  ): boolean => {
    if (filters.size === 0 || value.length == 0) return true;

    if (Array.isArray(value)) {
      return value.some(v => filters.has(v));
    }

    return filters.has(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleShowAllNearby = () => {
    /* Show volunteers' county filter tags*/
    volunteerPreferences?.locations.forEach(location => {
      const newSet = new Set(countyFilters);
      newSet.add(location);
      setCountyFilters(newSet);
    });

    /* Show column-filtered events view */
    setSearchActive(nearYouEvents.length > 0);
    setFilteredEvents(nearYouEvents);
  };

  const handleShowAllInterests = () => {
    /* Show volunteers' facility_type filter tags*/
    volunteerPreferences?.facility_type.forEach(facility => {
      const newSet = new Set(facilityFilters);
      newSet.add(facility);
      setFacilityFilters(newSet);
    });

    /* Show column-filered events view */
    setSearchActive(interestBasedEvents.length > 0);
    setFilteredEvents(interestBasedEvents);
  };

  const filterNearby = () => {
    const nearby = events.filter(event =>
      volunteerPreferences?.locations.includes(event.facilities.county),
    );
    nearby.sort(sortByDate);
    setNearYouEvents(nearby);
  };

  const filterFacilityInterest = () => {
    const interests = events.filter(event =>
      volunteerPreferences?.facility_type.includes(event.facilities.type),
    );
    interests.sort(sortByDate);
    setInterestBasedEvents(interests);
  };

  const sortByDate = (a: EventWithFacility, b: EventWithFacility): number => {
    const dateA = new Date(a.start_date_time).getTime();
    const dateB = new Date(b.start_date_time).getTime();
    return dateA - dateB;
  };

  const filterUpcoming = () => {
    const upcoming = [...events].sort(sortByDate);
    setUpcomingEvents(upcoming.slice(0, 10));
  };

  const filterVolunteerPreferences = () => {
    filterNearby();
    filterFacilityInterest();
    filterUpcoming();
    setEventsLoaded(true);
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

  const handleSearchClear = () => {
    setSearchInput('');

    // Keep filters applied and show filtered results
    if (allFilters.size > 0) {
      // Re-apply the current filters without the search text
      applyFilters(
        facilityFilters,
        countyFilters,
        hostFilters,
        audienceFilters,
        sortBy,
      );
    } else {
      // If no filters are applied, show all events
      setSearchActive(false);
      setFilteredEvents(events);
    }
  };

  const handleFilterClear = () => {
    // Clear all filters
    setFacilityFilters(new Set());
    setCountyFilters(new Set());
    setHostFilters(new Set());
    setAudienceFilters(new Set());
    setSortBy(new Set());

    // Keep search text and execute search if there's search input
    if (searchInput) {
      setSearchActive(true);
      getSearchEvents();
    } else {
      // If no search input, show all events
      setSearchActive(false);
      setFilteredEvents(events);
    }
  };

  const handleClearFilters = () => {
    setFacilityFilters(new Set());
    setCountyFilters(new Set());
    setHostFilters(new Set());
    setAudienceFilters(new Set());
    setSortBy(new Set());
    applyFilters(new Set(), new Set(), new Set(), new Set(), new Set());
  };

  const applyFilters = (
    newFacilityFilters: Set<string>,
    newCountyFilters: Set<string>,
    newHostFilters: Set<string>,
    newAudienceFilters: Set<string>,
    newSortByFilters: Set<string>,
  ) => {
    setSearchActive(
      !!(
        newFacilityFilters.size ||
        newCountyFilters.size ||
        newHostFilters.size ||
        newAudienceFilters.size ||
        newSortByFilters.size ||
        isFiltering
      ),
    );
    setIsFiltering(true);

    const checkMatch = (
      value: string | string[],
      filters: Set<string>,
    ): boolean => {
      if (filters.size === 0 || value.length == 0) return true;

      if (Array.isArray(value)) {
        return value.some(v => filters.has(v));
      }

      return filters.has(value);
    };

    const filtered = events.filter(event => {
      const facilityTypeMatch = checkMatch(
        event.facilities.type,
        newFacilityFilters,
      );
      const countyMatch = checkMatch(event.facilities.county, newCountyFilters);
      const hostMatch = checkMatch(
        event.needs_host ? 'Looking for Hosts' : 'No Host',
        newHostFilters,
      );
      const audienceMatch = checkMatch(
        event.facilities.audience,
        newAudienceFilters,
      );
      return facilityTypeMatch && countyMatch && hostMatch && audienceMatch;
    });

    if (newSortByFilters.has('Upcoming events')) {
      filtered.sort(sortByDate);
    }
    filtered.sort(sortByDate);

    setFilteredEvents(filtered);
    setIsFiltering(false);
  };

  const handleApplyClick = () => {
    applyFilters(
      facilityFilters,
      countyFilters,
      hostFilters,
      audienceFilters,
      sortBy,
    );
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
    const newAudienceFilters = new Set(audienceFilters);
    const newSortBy = new Set(sortBy);

    if (facilityFilters.has(filter)) newFacilityFilters.delete(filter);
    if (countyFilters.has(filter)) newCountyFilters.delete(filter);
    if (hostFilters.has(filter)) newHostFilters.delete(filter);
    if (audienceFilters.has(filter)) newAudienceFilters.delete(filter);
    if (sortBy.has(filter)) newSortBy.delete(filter);

    /* Update the filters */
    setFacilityFilters(newFacilityFilters);
    setCountyFilters(newCountyFilters);
    setHostFilters(newHostFilters);
    setAudienceFilters(newAudienceFilters);
    setSortBy(newSortBy);

    /* Check if we still have any filters or search input */
    const hasAnyFilter =
      newFacilityFilters.size > 0 ||
      newCountyFilters.size > 0 ||
      newHostFilters.size > 0 ||
      newAudienceFilters.size > 0 ||
      newSortBy.size > 0;

    /* Maintain search active state if we have search input or any filters left */
    setSearchActive(searchInput.length > 0 || hasAnyFilter);

    /* Reapply new filters */
    if (searchInput.length > 0) {
      // If we have search input, prioritize the search but keep filters
      getSearchEvents();
    } else {
      // If no search input, just apply the filters
      applyFilters(
        newFacilityFilters,
        newCountyFilters,
        newHostFilters,
        newAudienceFilters,
        newSortBy,
      );
    }
  };

  /* Render all events on page mount */
  useEffect(() => {
    const getAllActiveEvents = async () => {
      const fetchedActiveEvents: EventWithFacility[] =
        await fetchAllActiveEventsByFilter('');
      fetchedActiveEvents.sort(sortByDate);
      setEvents(fetchedActiveEvents);

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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!filterContext) return null;

  const {
    facilityFilters,
    setFacilityFilters,
    countyFilters,
    setCountyFilters,
    hostFilters,
    setHostFilters,
    audienceFilters,
    setAudienceFilters,
    sortBy,
    setSortBy,
    filteredEvents,
    setFilteredEvents,
    isSearchActive,
    setSearchActive,
  } = filterContext;

  const allFilters = new Set([
    ...facilityFilters,
    ...countyFilters,
    ...hostFilters,
    ...audienceFilters,
    ...sortBy,
  ]);

  const noMatches = isSearchActive && filteredEvents.length === 0;
  const showFiltered =
    isSearchActive && !isFiltering && filteredEvents.length > 0;
  const showDefault =
    !isSearchActive &&
    !isFiltering &&
    !filterMenuExpanded &&
    isEventsLoaded &&
    !noMatches;

  return (
    <div>
      <MenuBar setMenuExpanded={setMenuExpanded} />
      <Page $menuExpanded={menuExpanded}>
        <DiscoverHolder>
          <Discover $fontWeight="500"> Discover </Discover>
          <SearchBar>
            <Icon src={SearchIcon} alt="Search icon" />
            <SearchInput
              placeholder="Click here to search..."
              value={searchInput}
              onChange={handleChange}
              onKeyDown={handleEnter}
            />
            {searchInput.length > 0 && (
              <Button onClick={handleSearchClear}>
                <SearchXIcon src={X} alt="X" />
              </Button>
            )}
            {searchInput.length === 0 && (
              <Button onClick={handleFilterClick}>
                <P $fontWeight={400} $color={COLORS.rose9}>
                  {' '}
                  Filters{' '}
                </P>
              </Button>
            )}
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
                      {
                        placeholder: 'Sort by',
                        options: new Set(sortOptions),
                        value: sortBy,
                        onChange: newValue => setSortBy(newValue),
                      },
                      {
                        placeholder: 'Audience',
                        options: audienceOptions,
                        value: audienceFilters,
                        onChange: newValue => setAudienceFilters(newValue),
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
                {allFilters.size > 0 && (
                  <ResetButton onClick={handleFilterClear}>Reset</ResetButton>
                )}
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
                  <Label>Based on your location preferences...</Label>
                  {!isMobile && (
                    <Button onClick={handleShowAllNearby}>
                      <ShowAllText> show all </ShowAllText>
                    </Button>
                  )}
                </TitleBar>
                <DiscoverCardContainer $search={isSearchActive}>
                  {nearYouEvents.length > 0 ? (
                    (isMobile ? nearYouEvents.slice(0, 2) : nearYouEvents).map(
                      event => (
                        <DiscoverCard
                          search={isSearchActive}
                          key={event.event_id}
                          event={event}
                        />
                      ),
                    )
                  ) : (
                    <NoMatchContainer>
                      <NoMatchText>No matches</NoMatchText>
                      <Icon src={SadIcon} alt="Sad face icon" />
                    </NoMatchContainer>
                  )}
                  {isMobile && (
                    <Button onClick={handleShowAllNearby}>
                      <ShowAllText> show all </ShowAllText>
                    </Button>
                  )}
                </DiscoverCardContainer>
              </RowContainer>
              <RowContainer>
                <TitleBar>
                  <Label>Based on your interests...</Label>
                  {!isMobile && (
                    <Button onClick={handleShowAllInterests}>
                      <ShowAllText> show all </ShowAllText>
                    </Button>
                  )}
                </TitleBar>
                <DiscoverCardContainer $search={isSearchActive}>
                  {interestBasedEvents.length > 0 ? (
                    (isMobile
                      ? interestBasedEvents.slice(0, 2)
                      : interestBasedEvents
                    ).map(event => (
                      <DiscoverCard
                        search={isSearchActive}
                        key={event.event_id}
                        event={event}
                      />
                    ))
                  ) : (
                    <NoMatchContainer>
                      <NoMatchText>No matches</NoMatchText>
                      <Icon src={SadIcon} alt="Sad face icon" />
                    </NoMatchContainer>
                  )}
                  {isMobile && (
                    <Button onClick={handleShowAllInterests}>
                      <ShowAllText> show all </ShowAllText>
                    </Button>
                  )}
                </DiscoverCardContainer>
              </RowContainer>
              <RowContainer>
                <TitleBar>
                  <Label>Upcoming Events...</Label>
                  {!isMobile && (
                    <Button onClick={handleShowAllInterests}>
                      <ShowAllText> show all </ShowAllText>
                    </Button>
                  )}
                </TitleBar>
                <DiscoverCardContainer $search={isSearchActive}>
                  {upcomingEvents.length > 0 ? (
                    (isMobile
                      ? upcomingEvents.slice(0, 2)
                      : upcomingEvents
                    ).map(event => (
                      <DiscoverCard
                        search={isSearchActive}
                        key={event.event_id}
                        event={event}
                      />
                    ))
                  ) : (
                    <NoMatchContainer>
                      <NoMatchText>No matches</NoMatchText>
                      <Icon src={SadIcon} alt="Sad face icon" />
                    </NoMatchContainer>
                  )}
                  {isMobile && (
                    <Button onClick={handleShowAllInterests}>
                      <ShowAllText> show all </ShowAllText>
                    </Button>
                  )}
                </DiscoverCardContainer>
              </RowContainer>
            </DiscoverContainer>
          )}
          {/* Filtered Events View */}
          {showFiltered && !filterMenuExpanded && (
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
