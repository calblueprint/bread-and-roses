'use client';

import React, { createContext, ReactNode, useState } from 'react';

export interface FacilityGeneralInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  facilityName: string;
  facilityType: string | null;
  directions: string;
  capacity: string;
  audience: string[];
}

export interface Location {
  address: string;
  city: string;
  county: string;
  zipCode: string;
}

export type ParkingOptions = 'Street' | 'Parking Lot' | 'None';

export interface FacilityInfo {
  parking: ParkingOptions | null;
  has_piano: boolean | null;
  has_sound_equipment: boolean | null;
  volunteer_notes: string;
  admin_notes: string;
}

interface FacilityOnboardingContextType {
  facilityGeneralInfo: FacilityGeneralInfo;
  setGeneralInfo: (info: FacilityGeneralInfo) => void;
  location: Location;
  setLocation: (location: Location) => void;
  facilitySpecificInfo: FacilityInfo;
  setSpecificInfo: (info: FacilityInfo) => void;
}

export const FacilityOnboardingContext = createContext<
  FacilityOnboardingContextType | undefined
>(undefined);

export const FacilityOnboardingProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [generalInfo, setGeneralInfo] = useState<FacilityGeneralInfo>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    facilityName: '',
    facilityType: null,
    directions: '',
    capacity: '',
    audience: [],
  });

  const [location, setLocation] = useState<Location>({
    address: '',
    city: '',
    county: '',
    zipCode: '',
  });

  const [specificInfo, setSpecificInfo] = useState<FacilityInfo>({
    parking: null,
    has_piano: null,
    has_sound_equipment: null,
    volunteer_notes: '',
    admin_notes: '',
  });

  return (
    <FacilityOnboardingContext.Provider
      value={{
        facilityGeneralInfo: generalInfo,
        setGeneralInfo,
        location,
        setLocation,
        facilitySpecificInfo: specificInfo,
        setSpecificInfo,
      }}
    >
      {children}
    </FacilityOnboardingContext.Provider>
  );
};
