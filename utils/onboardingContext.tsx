'use client';

import React, { createContext, ReactNode, useState } from 'react';
import supabase from '@/api/supabase/createClient';

export interface Role {
  isHost: boolean;
  isPerformer: boolean;
}

export interface GeneralInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
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
}

interface OnboardingContextType {
  generalInfo: GeneralInfo;
  setGeneralInfo: (info: GeneralInfo) => void;
  preferences: Preferences;
  setPreferences: (preferences: Preferences) => void;
  role: Role;
  setRole: (role: Role) => void;
  submitOnboardingData: () => Promise<void>;
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
    facilityType: [],
    location: [],
    audience: [],
    performanceType: [],
    genre: [],
    performerType: [],
    additionalInfo: '',
  });

  const [role, setRole] = useState<Role>({
    isHost: false,
    isPerformer: false,
  });

  const submitOnboardingData = async () => {
    try {
      const { data: volunteerData, error: volunteerError } = await supabase
        .from('volunteers')
        .insert([
          {
            first_name: generalInfo.firstName,
            last_name: generalInfo.lastName,
            phone_number: generalInfo.phoneNumber,
            notifications_opt_in: generalInfo.notifications,
          },
        ]);

      if (volunteerError) throw volunteerError;

      const { data: preferencesData, error: preferencesError } = await supabase
        .from('volunteer_preferences')
        .insert([
          {
            role: [
              role.isPerformer ? 'performer' : null,
              role.isHost ? 'host' : null,
            ].filter(Boolean),
            facility_type: preferences.facilityType,
            locations: preferences.location,
            audience_type: preferences.audience,
            performance_type: preferences.performanceType,
            genre: preferences.genre,
            performer_type: preferences.performerType,
            additional_info: preferences.additionalInfo,
          },
        ]);

      if (preferencesError) throw preferencesError;

      console.log('Onboarding data submitted successfully:', {
        volunteerData,
        preferencesData,
      });
    } catch (error) {
      console.error('Error submitting onboarding data:', error);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        generalInfo,
        setGeneralInfo,
        preferences,
        setPreferences,
        role,
        setRole,
        submitOnboardingData,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
