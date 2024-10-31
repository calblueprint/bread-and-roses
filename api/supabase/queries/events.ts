import supabase from '../createClient';

export async function fetchAllEvents() {
  const { data, error } = await supabase.from('events').select('*');

  if (error) {
    console.error('An error occurred trying to read events:', error);
    return null;
  }

  return data;
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
