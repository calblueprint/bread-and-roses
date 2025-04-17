import type { UUID } from 'crypto';
import supabase from '../createClient';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function fetchFacilityIdByUserId(user_id: string) {
  const { data, error } = await supabase
    .from('facility_contacts')
    .select('facility_id')
    .eq('user_id', user_id)
    .single();

  if (error) {
    console.error('Error fetching facility_id:', error);
    return null;
  }

  return data?.facility_id ?? null;
}

export async function fetchAvailabilitiesByFacilityId(user_id: string) {
  try {
    const facility_id = await fetchFacilityIdByUserId(user_id);
    const { data, error } = await supabase
      .from('availabilities')
      .select('*, available_dates(*)')
      .eq('facility_id', facility_id);

    if (error) {
      console.error('Error fetching availability by facility id:', error);
      return null;
    }

    const now = new Date().toISOString();

    // Only keep availabilities with at least one future end_date_time
    const futureAvailabilities = (data ?? []).filter(availability =>
      availability.available_dates?.some(
        (date: typeof availability) => date.end_date_time > now,
      ),
    );

    if (futureAvailabilities.length === 0) {
      console.log('No future availabilities for facility:', facility_id);
      return null;
    }

    return futureAvailabilities;
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return null;
  }
}

export async function fetchAvailabilityByAvailabilityId(availability_id: UUID) {
  const { data, error } = await supabase
    .from('availabilities')
    .select('*')
    .eq('availability_id', availability_id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}

export async function fetchAllAvailabilities() {
  try {
    const { data, error } = await supabase.from('availabilities').select('*');
    if (error) {
      throw new Error(error.message);
    }
    if (data && data.length == 0) {
      console.log('No availabilities found');
      return [];
    }
    return data;
  } catch (error) {
    console.error('An unexpected error occured:', error);
    return null;
  }
}

export async function fetchDatesByAvailabilityID(availability_id: UUID) {
  try {
    const { data, error } = await supabase
      .from('available_dates')
      .select('*')
      .eq('availability_id', availability_id);
    if (error) {
      throw new Error(error.message);
    }
    if (data && data.length == 0) {
      console.log(
        'No dates found for this availability id or availability_id is undefined',
        availability_id,
      );
      return [];
    }
    return data;
  } catch (error) {
    console.error('An unexpected error occured:', error);
    return [];
  }
}
