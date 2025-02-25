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

export async function eventSignUp(user: {
  id: UUID;
  event_id: UUID;
  role: string;
  group_size: number;
  additional_info: string;
}) {
  if (!user.id) {
    return {
      success: false,
      message: 'User data is missing. Cannot insert into volunteers table.',
    };
  }

  const { error: insertError } = await supabase.from('event_signups').insert([
    {
      event_id: user.event_id,
      user_id: user.id,
      role: user.role,
      is_accepted: false,
      group_size: user.group_size,
      additional_info: user.additional_info,
    },
  ]);

  if (insertError) {
    return {
      success: false,
      message: `Error signing user up for event: ${insertError.message}`,
    };
  }

  return {
    success: true,
    message: 'User successfully signed up for event.',
  };
}
