import { UUID } from 'crypto';
import supabase from '../createClient';

export async function fetchAllEvents() {
  const { data, error } = await supabase.from('events').select('*');

  if (error) {
    throw error;
  }

  return data;
}

export async function fetchAcceptedEventsByVolunteer(user_id: UUID) {
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

// fetches all events that have event_status = 'Active'
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
    .single();

  if (error) {
    throw new Error(error.message);
  }

  const { data: host, error: hosterror } = await supabase
    .from('volunteers')
    .select('*')
    .eq('user_id', data.user_id)
    .single();

  if (hosterror) {
    throw new Error(hosterror.message);
  }

  return host;
}
