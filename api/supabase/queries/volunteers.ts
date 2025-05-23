import { UUID } from 'crypto';
import {
  UserInfo,
  UserPreferences,
  UserPreferencesInfo,
} from '@/utils/settingsInfo';
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
      'role, facility_type, audience_type, genre, performance_type, locations, additional_info, performer_type, info',
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

export async function updateVolunteerPreferences(
  id: string,
  user_prefs: UserPreferences,
  edited_prefs: UserPreferences,
) {
  const updatedKeys: { [key: string]: string | string[] } = {};

  if (user_prefs.additional_info != edited_prefs.additional_info) {
    updatedKeys['additional_info'] = edited_prefs.additional_info;
  }

  if (user_prefs.role != edited_prefs.role) {
    updatedKeys['role'] = edited_prefs.role;
  }

  if (user_prefs.genre != edited_prefs.genre) {
    updatedKeys['genre'] = edited_prefs.genre;
  }

  if (user_prefs.performance_type != edited_prefs.performance_type) {
    updatedKeys['performance_type'] = edited_prefs.performance_type;
  }

  if (user_prefs.locations != edited_prefs.locations) {
    updatedKeys['locations'] = edited_prefs.locations;
  }

  if (user_prefs.facility_type != edited_prefs.facility_type) {
    updatedKeys['facility_type'] = edited_prefs.facility_type;
  }

  if (user_prefs.audience_type != edited_prefs.audience_type) {
    updatedKeys['audience_type'] = edited_prefs.audience_type;
  }

  if (user_prefs.performer_type != edited_prefs.performer_type) {
    updatedKeys['performer_type'] = edited_prefs.performer_type;
  }

  if (Object.keys(updatedKeys).length > 0) {
    const { data, error } = await supabase
      .from('volunteer_preferences')
      .update(updatedKeys)
      .eq('user_id', id);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}

export async function updateVolunteerAdditionalInfo(
  id: string,
  user_info: UserPreferencesInfo,
  edit_info: UserPreferencesInfo,
) {
  if (user_info != edit_info) {
    const { data, error } = await supabase
      .from('volunteer_preferences')
      .update({ info: edit_info })
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
  performer_emails: string[];
}) {
  if (!user.id) {
    return {
      success: false,
      message: 'User data is missing. Cannot insert into volunteers table.',
    };
  }
  console.log('Performers', user.performer_emails);
  const { error: insertError } = await supabase.from('event_signups').insert([
    {
      event_id: user.event_id,
      user_id: user.id,
      role: user.role,
      is_accepted: false,
      group_size: user.group_size,
      additional_info: user.additional_info,
      performer_emails: user.performer_emails,
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

export async function checkUserSignedupEvent(
  user_id: string,
  event_id: string,
) {
  const { data, error } = await supabase
    .from('event_signups')
    .select('signup_id')
    .eq('user_id', user_id)
    .eq('event_id', event_id);

  if (error) {
    throw new Error(error.message);
  }

  return data.length > 0;
}

export async function removeVolunteerSignUp(user_id: string, event_id: string) {
  const { error } = await supabase
    .from('event_signups')
    .delete()
    .match({ user_id, event_id });

  if (error) {
    console.error('Error removing signup:', error.message);
    return false;
  }

  return true;
}
