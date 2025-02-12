'use client';

import React, { createContext, ReactNode, useState } from 'react';

export interface GeneralInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface Location {
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface FacilityOnboardingContextType {
  generalInfo: GeneralInfo;
  setGeneralInfo: (info: GeneralInfo) => void;
  location: Location;
  setLocation: (location: Location) => void;
}

export const FacilityOnboardingContext = createContext<
  FacilityOnboardingContextType | undefined
>(undefined);

export const FacilityOnboardingProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [generalInfo, setGeneralInfo] = useState<GeneralInfo>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  const [location, setLocation] = useState<Location>({
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  return (
    <FacilityOnboardingContext.Provider
      value={{
        generalInfo,
        setGeneralInfo,
        location,
        setLocation,
      }}
    >
      {children}
    </FacilityOnboardingContext.Provider>
  );
};
