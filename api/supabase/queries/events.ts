import supabase from '../createClient';

export async function fetchAllEvents() {
  const { data, error } = await supabase.from('events').select('*');

  if (error) {
    console.error('An error occurred trying to read events:', error);
    return null;
  }

  return data;
}
