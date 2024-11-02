'use client';

import React, { createContext, ReactNode, useState } from 'react';
import supabase from '@/api/supabase/createClient';

interface GeneralInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  notifications: boolean;
}

interface Preferences {
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
    facilityType: '',
    location: '',
    audience: '',
    preferredEquipment: '',
    typeOfAct: '',
    genre: '',
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
          },
        ]);

      if (volunteerError) throw volunteerError;

      const { data: preferencesData, error: preferencesError } = await supabase
        .from('volunteer_preferences')
        .insert([
          {
            facility_type: preferences.facilityType,
            city: preferences.location,
            audience: preferences.audience,
            instruments: preferences.preferredEquipment,
            type_of_act: preferences.typeOfAct,
            genre: preferences.genre,
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
        submitOnboardingData,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
