import type { UUID } from 'crypto';
import supabase from '../createClient';

export async function fetchAvailabilitiesByFacilityId(facility_id: UUID) {
  try {
    const { data, error } = await supabase
      .from('availabilities')
      .select('*')
      .eq('facility_id', facility_id);
    if (error) {
      console.error('Error fetching availability by facility id:', error);
    }
    //Check if data array is not empty
    if (data && data.length == 0) {
      console.log(
        'No availabilities found for this facility_id or facility_id is undefined',
      );
      return null; // Return null if no matching data found
    }
    console.log('Availability of facility', facility_id, ':', data);
  } catch (error) {
    console.error(`An unexpected error occurred:`, error);
    return null; // Return null on unexpected error
  }
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
    return null;
  }
}
