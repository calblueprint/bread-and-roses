import { UUID } from 'crypto';
import { Facilities } from '@/types/schema';
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
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function fetchFacilityByUserID(
  user_id: string,
): Promise<Facilities | null> {
  const { data, error } = await supabase
    .from('facilities')
    .select('*')
    .eq('user_id', user_id)
    .single();

  if (error) {
    console.log(error.message);
    return null;
  }

  return data;
}

export async function fetchFacilityIDByUserID(user_id: string) {
  const { data, error } = await supabase
    .from('facilities')
    .select('facility_id')
    .eq('user_id', user_id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data?.facility_id;
}
