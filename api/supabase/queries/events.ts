import supabase from '../createClient';

export async function fetchAllEvents() {
  const { data, error } = await supabase.from('events').select('*');

  if (error) {
    console.error('An error occurred trying to read events:', error);
    return null;
  }

  return data;
}

// fetches all events that have event_status = 'ACTIVE'
export async function fetchAllActiveEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('event_status', 'ACTIVE');
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// fetches an event by its event_id
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
