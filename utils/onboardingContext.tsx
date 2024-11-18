'use client';

import React, { createContext, ReactNode, useState } from 'react';

export interface GeneralInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  notifications: boolean;
}

export interface Preferences {
  facilityType: string;
  location: string;
  audience: string;
  preferredEquipment: string;
  typeOfAct: string;
  genre: string;
}

interface OnboardingContextType {
  generalInfo: GeneralInfo;
  setGeneralInfo: (info: GeneralInfo) => void;
  preferences: Preferences;
  setPreferences: (preferences: Preferences) => void;
  // submitOnboardingData: () => Promise<void>;
}

export const OnboardingContext = createContext<
  OnboardingContextType | undefined
>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [generalInfo, setGeneralInfo] = useState<GeneralInfo>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    notifications: false,
  });

  const [preferences, setPreferences] = useState<Preferences>({
    facilityType: '',
    location: '',
    audience: '',
    preferredEquipment: '',
    typeOfAct: '',
    genre: '',
  });

  return (
    <OnboardingContext.Provider
      value={{
        generalInfo,
        setGeneralInfo,
        preferences,
        setPreferences,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
