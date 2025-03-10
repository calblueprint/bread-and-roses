import { UUID } from 'crypto';
import supabase from '../createClient';

export async function fetchAllEvents() {
  const { data, error } = await supabase.from('events').select('*');

  if (error) {
    throw error;
  }

  return data;
}

export async function fetchAcceptedEventsByVolunteer(user_id: string) {
  const { data, error } = await supabase
    .from('event_signups')
    .select('*')
    .eq('user_id', user_id)
    .eq('is_accepted', true);

  if (error) {
    throw error;
  }
  if (!data || data.length === 0) {
    //No accepted events for volunteer found
    return [];
  }

  const eventIDs = data.map(data => data.event_id);

  const { data: events, error: eventsError } = await supabase
    .from('events')
    .select('*')
    .eq('event_status', 'Active')
    .in('event_id', eventIDs);

  if (eventsError) {
    throw eventsError;
  }
  return events;
}

export async function fetchAcceptedEventsByFacility(facility_id: string) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('facility_id', facility_id)
    .eq('event_status', 'Active');

  if (error) {
    throw error;
  }

  return data || [];
 }
 

/* Find events by facility name, city, or county */
export async function fetchAllActiveEventsBySearch(search: string) {
  const pattern = `%${search}%`;

  const { data, error } = await supabase
    .from('events')
    .select('*, facilities!inner(name, county, city)')
    .eq('event_status', 'Active')
    .or(`name.ilike.${pattern},city.ilike.${pattern},county.ilike.${pattern}`, {
      foreignTable: 'facilities',
    });
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// fetches all events that have event_status = 'Active',
export async function fetchAllActiveEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('event_status', 'Active');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function fetchEventById(event_id: string) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('event_id', event_id)
    .single();
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function fetchEventHostByID(event_id: UUID) {
  const { data, error } = await supabase
    .from('event_signups')
    .select('*')
    .eq('event_id', event_id)
    .eq('role', 'HOST')
    .eq('is_accepted', true)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  // if host not found
  if (!data) {
    return null;
  }

  const { data: host, error: hosterror } = await supabase
    .from('volunteers')
    .select('*')
    .eq('user_id', data.user_id)
    .maybeSingle();

  if (hosterror) {
    throw new Error(hosterror.message);
  }

  return host;
}
