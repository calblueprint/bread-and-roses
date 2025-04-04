'use client';

import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UUID } from 'crypto';
import supabase from '@/api/supabase/createClient';
import { fetchFacilityIDByUserID } from '@/api/supabase/queries/facilities';
import { useSession } from './AuthProvider';

export interface GeneralInfo {
  eventName: string;
  additionalInfo: string;
  facilityId: string;
  availabilityId?: UUID /* Exists if availability is being edited*/;
}

export interface TimeRange {
  id: string;
  start: number;
  end: number;
}

export const defaultRange: TimeRange = {
  id: crypto.randomUUID(),
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
      /* Delete previous availability if editing, before re-inserting new availability*/
      const editId = generalInfo.availabilityId;
      if (editId) {
        const { error: deleteAvailabilityError } = await supabase
          .from('availabilities')
          .delete()
          .eq('availability_id', editId);

        if (deleteAvailabilityError) throw deleteAvailabilityError;

        const { error: deleteDatesError } = await supabase
          .from('available_dates')
          .delete()
          .eq('availability_id', editId);

        if (deleteDatesError) throw deleteDatesError;

        console.log(
          `Deleted previous availability and dates for availability_id: ${editId}`,
        );
      }

      /* Insert new availability and dates */
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
            const startHour = Math.floor(timeRange.start / 60);
            const startMin = timeRange.start % 60;
            startDate.setHours(startHour, startMin);

            const endDate = new Date(date);
            const endHour = Math.floor(timeRange.end / 60);
            const endMin = timeRange.end % 60;
            endDate.setHours(endHour, endMin);

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
