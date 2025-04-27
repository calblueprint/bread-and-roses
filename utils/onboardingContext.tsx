'use client';

import React, { createContext, ReactNode, useState } from 'react';

export interface Role {
  isHost: boolean;
  isPerformer: boolean;
}

export interface Info {
  hasSoundEquipment: string;
  needsPiano: string;
  canHost: string;
  availability: string;
  soundEquipPickup: string;
  useSoundEquip: string;
}

export interface GeneralInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  socialMedia: string;
  notifications: boolean;
}

export interface Preferences {
  facilityType: string[];
  location: string[];
  audience: string[];
  performanceType: string[];
  performerType: string[];
  genre: string[];
  additionalInfo: string;
  info: Info;
}

interface OnboardingContextType {
  generalInfo: GeneralInfo;
  setGeneralInfo: (info: GeneralInfo) => void;
  preferences: Preferences;
  setPreferences: (preferences: Preferences) => void;
  role: Role;
  setRole: (role: Role) => void;
}

export const OnboardingContext = createContext<
  OnboardingContextType | undefined
>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [generalInfo, setGeneralInfo] = useState<GeneralInfo>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    socialMedia: '',
    notifications: true,
  });

  const [preferences, setPreferences] = useState<Preferences>({
    facilityType: [],
    location: [],
    audience: [],
    performanceType: [],
    genre: [],
    performerType: [],
    additionalInfo: '',
    info: {
      hasSoundEquipment: '',
      needsPiano: '',
      canHost: '',
      availability: '',
      soundEquipPickup: '',
      useSoundEquip: '',
    },
  });

  const [role, setRole] = useState<Role>({
    isHost: false,
    isPerformer: false,
  });

  return (
    <OnboardingContext.Provider
      value={{
        generalInfo,
        setGeneralInfo,
        preferences,
        setPreferences,
        role,
        setRole,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
