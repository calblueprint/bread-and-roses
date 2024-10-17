import { UUID } from 'crypto';
import supabase from '../createClient';

export async function fetchAllEvents() {
  const { data, error } = await supabase.from('events').select('*');

  if (error) {
    throw error;
  }

  return data;
}

export async function fetchAcceptedEventsByVolunteer(volunteer_id: UUID) {
  const { data, error } = await supabase
    .from('event_signups')
    .select('*')
    .eq('volunteer_id', volunteer_id)
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
    .in('event_id', eventIDs);

  if (eventsError) {
    throw eventsError;
  }

  return events;
}
