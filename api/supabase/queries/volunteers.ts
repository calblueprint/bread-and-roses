import { UUID } from 'crypto';
import supabase from '../createClient';

export async function fetchPerformer(event_id: UUID) {
  const { data, error } = await supabase
    .from('event_signups')
    .select('*')
    .eq('event_id', event_id)
    .eq('role', 'PERFORMER')
    .eq('is_accepted', true)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  // if performer not found
  if (!data) {
    return null;
  }

  const { data: performer, error: performererror } = await supabase
    .from('volunteers')
    .select('*')
    .eq('user_id', data.user_id)
    .maybeSingle();

  if (performererror) {
    throw new Error(performererror.message);
  }

  return performer;
}
