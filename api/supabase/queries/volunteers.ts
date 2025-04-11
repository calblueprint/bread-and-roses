import { UUID } from 'crypto';
import { UserInfo } from '@/utils/settingsInfo';
import supabase from '../createClient';

export async function fetchVolunteerInfo(user_id: string) {
  const { data, error } = await supabase
    .from('volunteers')
    .select('first_name, last_name, email, phone_number')
    .eq('user_id', user_id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function fetchVolunteerPreferences(user_id: string) {
  const { data, error } = await supabase
    .from('volunteer_preferences')
    .select(
      'facility_type, audience_type, genre, performance_type, locations, additional_info ',
    )
    .eq('user_id', user_id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateVolunteerInfo(
  id: string,
  user_info: UserInfo,
  edit_info: UserInfo,
) {
  /*const updatedFields: Partial<UserInfo> = {};

  //check which fields need to be updated
  Object.keys(user_info).forEach((key) => {
    if (user_info[key] !== edit_info[key]) {
      updatedFields[key] = edit_info[key];
    }
  });

  //update the data
  if (Object.keys(updatedFields).length > 0) {
    const {data, error} = await supabase
      .from('volunteers')
      .update(updatedFields)
      .eq('user_id', id);
     
    if (error) {
      throw new Error(error.message);
    } 

    return data;

    }
  */
  const updatedKeys: { [key: string]: string } = {};
  if (user_info.first_name != edit_info.first_name) {
    updatedKeys['first_name'] = edit_info.first_name;
  }

  if (user_info.last_name != edit_info.last_name) {
    updatedKeys['last_name'] = edit_info.last_name;
  }

  if (user_info.phone_number != edit_info.phone_number) {
    updatedKeys['phone_number'] = edit_info.phone_number;
  }

  if (Object.keys(updatedKeys).length > 0) {
    const { data, error } = await supabase
      .from('volunteers')
      .update(updatedKeys)
      .eq('user_id', id);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}

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
