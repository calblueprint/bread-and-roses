'use client';

import React, { createContext, ReactNode, useState } from 'react';
import { Event } from '@/types/schema';

interface EventWithFacility extends Event {
  facilities: {
    county: string;
    type: string;
    audience: string[];
  };
}
interface FilterContextType {
  facilityFilters: Set<string>;
  setFacilityFilters: (filters: Set<string>) => void;
  countyFilters: Set<string>;
  setCountyFilters: (filters: Set<string>) => void;
  hostFilters: Set<string>;
  setHostFilters: (filters: Set<string>) => void;
  audienceFilters: Set<string>;
  setAudienceFilters: (filters: Set<string>) => void;
  sortBy: Set<string>;
  setSortBy: (filters: Set<string>) => void;
  filteredEvents: EventWithFacility[];
  setFilteredEvents: (events: EventWithFacility[]) => void;
  isSearchActive: boolean;
  setSearchActive: (isActive: boolean) => void;
}

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined,
);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [facilityFilters, setFacilityFilters] = useState(new Set<string>());
  const [countyFilters, setCountyFilters] = useState(new Set<string>());
  const [hostFilters, setHostFilters] = useState(new Set<string>());
  const [audienceFilters, setAudienceFilters] = useState(new Set<string>());
  const [sortBy, setSortBy] = useState(new Set<string>());
  const [filteredEvents, setFilteredEvents] = useState<EventWithFacility[]>([]);
  const [isSearchActive, setSearchActive] = useState<boolean>(false);

  return (
    <FilterContext.Provider
      value={{
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
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
