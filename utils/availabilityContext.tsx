'use client';

import React, { createContext, ReactNode, useState } from 'react';

//import supabase from '@/api/supabase/createClient';

export interface GeneralInfo {
  eventName: string;
  additionalInfo: string;
}

export interface TimeRange {
  start: number;
  end: number;
}

export const defaultRange: TimeRange = {
  start: 9 * 60,
  end: 17 * 60,
};

interface AvailabilityContextType {
  generalInfo: GeneralInfo;
  setGeneralInfo: (info: GeneralInfo) => void;
  days: string[];
  setDays: (days: string[]) => void;
  times: { [date: string]: TimeRange[] };
  setTimes: (times: { [date: string]: TimeRange[] }) => void;
  submitAvailabilityData: () => Promise<void>;
}

export const AvailabilityContext = createContext<
  AvailabilityContextType | undefined
>(undefined);

export const AvailabilityProvider = ({ children }: { children: ReactNode }) => {
  const [generalInfo, setGeneralInfo] = useState<GeneralInfo>({
    eventName: '',
    additionalInfo: '',
  });
  const [days, setDays] = useState<string[]>([]);
  const [times, setTimes] = useState<{ [date: string]: TimeRange[] }>({});

  const submitAvailabilityData = async () => {
    // try {
    //   const { data: volunteerData, error: volunteerError } = await supabase
    //     .from('availabilities')
    //     .insert([
    //       {
    //         first_name: generalInfo.firstName,
    //         last_name: generalInfo.lastName,
    //         phone_number: generalInfo.phoneNumber,
    //         notifications_opt_in: generalInfo.notifications,
    //       },
    //     ]);
    //   if (volunteerError) throw volunteerError;
  };

  return (
    <AvailabilityContext.Provider
      value={{
        generalInfo,
        setGeneralInfo,
        days,
        setDays,
        times,
        setTimes,
        submitAvailabilityData,
      }}
    >
      {children}
    </AvailabilityContext.Provider>
  );
};
