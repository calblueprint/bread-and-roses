'use client';

import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/api/supabase/createClient';
import { fetchFacilityIDByUserID } from '@/api/supabase/queries/facilities';
import { useSession } from './AuthProvider';

export interface GeneralInfo {
  eventName: string;
  additionalInfo: string;
  facilityId: string;
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
  const { session } = useSession();
  const router = useRouter();
  const [generalInfo, setGeneralInfo] = useState<GeneralInfo>({
    eventName: '',
    additionalInfo: '',
    facilityId: '',
  });
  const [days, setDays] = useState<string[]>([]);
  const [times, setTimes] = useState<{ [date: string]: TimeRange[] }>({});

  useEffect(() => {
    if (session?.user?.id) {
      fetchFacilityIDByUserID(session.user.id)
        .then(facilityId => {
          if (facilityId) {
            setGeneralInfo(prev => ({ ...prev, facilityId }));
          }
        })
        .catch(error => console.error('Error fetching facility ID:', error));
    }
  }, [session?.user?.id]);

  const submitAvailabilityData = async () => {
    try {
      const { data: availabilityData, error: availabilityError } =
        await supabase
          .from('availabilities')
          .insert([
            {
              name: generalInfo.eventName,
              additional_info: generalInfo.additionalInfo,
              facility_id: generalInfo.facilityId,
            },
          ])
          .select('availability_id')
          .single();

      if (availabilityError) throw availabilityError;
      const availabilityId = availabilityData.availability_id;

      const availabilities = Object.entries(times).flatMap(
        ([date, timeRanges]) =>
          timeRanges.map(timeRange => {
            const startDate = new Date(date);
            startDate.setMinutes(timeRange.start);

            const endDate = new Date(date);
            endDate.setMinutes(timeRange.end);

            return {
              date_id: crypto.randomUUID(),
              availability_id: availabilityId,
              start_date_time: startDate.toISOString(),
              end_date_time: endDate.toISOString(),
            };
          }),
      );

      const { error: dateError } = await supabase
        .from('available_dates')
        .insert(availabilities);

      if (dateError) throw dateError;

      console.log('Availabilites successfully submitted');

      router.push('/availability/general?success=true');
    } catch (error) {
      console.error('Error submitting availabilities:', error);
      router.push('/availability/general?success=false');
    }
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
