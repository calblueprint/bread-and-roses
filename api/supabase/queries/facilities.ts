import { UUID } from 'crypto';
import supabase from '../createClient';

// fetches an event by its event_id
export async function fetchFacilityById(facility_id: string) {
  const { data, error } = await supabase
    .from('facilities')
    .select('*')
    .eq('facility_id', facility_id)
    .single();
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function fetchFacilityContactByID(facility_id: UUID) {
  const { data, error } = await supabase
    .from('facility_contacts')
    .select('*')
    .eq('facility_id', facility_id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}