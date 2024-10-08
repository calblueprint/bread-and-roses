import supabase from '../createClient';

export async function fetchAvailabilitiesByFacilityId(facility_id: string) {
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
