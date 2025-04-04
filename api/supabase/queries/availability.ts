import type { UUID } from 'crypto';
import supabase from '../createClient';

export async function fetchAvailabilitiesByFacilityUser(user_id: string) {
  try {
    // const { data, error } = await supabase
    //   .from('availabilities')
    //   .select('*')
    //   .eq('facility_id', facility_id)
    //   .gt('end_date_time', new Date().toISOString());

    // if (error) {
    //   console.error('Error fetching availability by facility id:', error);
    //   return null;
    // }
    // //Check if data array is not empty
    // if (!data || data.length == 0) {
    //   console.log(
    //     'No availabilities found for this facility_id or facility_id is undefined',
    //   );

    //   return null; // Return null if no matching data found
    // }

    // return data;
    const { data, error } = await supabase
      .from('facilities')
      .select('facility_id')
      .eq('user_id', user_id)
      .single();

    if (error) {
      console.error('Error fetching facility ID for user:', error);
      return [];
    }

    if (!data) {
      console.log('No facility found for user:', user_id);
      return [];
    }

    const facility_id = data.facility_id;

    // Fetch availabilities using the facility ID
    const { data: availabilities, error: availabilitiesError } = await supabase
      .from('availabilities')
      .select('*')
      .eq('facility_id', facility_id)
      .gt('end_date_time', new Date().toISOString());

    if (availabilitiesError) {
      console.error(
        'Error fetching availabilities for facility:',
        availabilitiesError,
      );
      return [];
    }

    return availabilities ?? [];

    //console.log('Availability of facility', facility_id, ':', data);
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
