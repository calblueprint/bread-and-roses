// cache.ts
'use client';

import { cache } from 'react';
import {
  fetchAcceptedEventsByVolunteer,
  fetchEventById,
  fetchEventHostByID,
} from '@/api/supabase/queries/events';
import {
  fetchFacilityById,
  fetchFacilityContactByID,
} from '@/api/supabase/queries/facilities';
import { fetchPerformer } from '@/api/supabase/queries/volunteers';

// Create cached versions of the fetching functions
export const cachedEvents = cache(fetchAcceptedEventsByVolunteer);
export const cachedEvent = cache(fetchEventById);
export const cachedFacility = cache(fetchFacilityById);
export const cachedFacilityContact = cache(fetchFacilityContactByID);
export const cachedHost = cache(fetchEventHostByID);
export const cachedPerformer = cache(fetchPerformer);
