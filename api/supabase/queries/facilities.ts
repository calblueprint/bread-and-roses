import { UUID } from 'crypto';
import { Facilities } from '@/types/schema';
import { AdditionalInfo, FacilityInfo, UserInfo } from '@/utils/settingsInfo';
import supabase from '../createClient';

// fetches an event by its event_id
export async function fetchFacilityContactInfo(user_id: string) {
  const { data, error } = await supabase
    .from('facility_contacts')
    .select('first_name, last_name, email, phone_number')
    .eq('user_id', user_id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function fetchFacilityInfo(user_id: string) {
  const { data, error } = await supabase
    .from('facilities')
    .select(
      'name, county, city, street_address_1, street_address_2, audience, type, host_name, host_phone_number, host_email, has_host, info',
    )
    .eq('user_id', user_id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateFacilityContactInfo(
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
      .from('facility_contacts')
      .update(updatedKeys)
      .eq('user_id', id);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}

export async function updateFacilityInfo(
  id: string,
  facility_info: FacilityInfo,
  edit_info: FacilityInfo,
) {
  const updatedKeys: {
    [key: string]: string | string[] | boolean | null | AdditionalInfo;
  } = {};

  if (facility_info.name != edit_info.name) {
    updatedKeys['name'] = edit_info.name;
  }

  if (facility_info.county != edit_info.county) {
    updatedKeys['county'] = edit_info.county;
  }

  if (facility_info.city != edit_info.city) {
    updatedKeys['city'] = edit_info.city;
  }

  if (facility_info.street_address_1 != edit_info.street_address_1) {
    updatedKeys['street_address_1'] = edit_info.street_address_1;
  }

  if (facility_info.street_address_2 != edit_info.street_address_2) {
    updatedKeys['street_address_2'] = edit_info.street_address_2;
  }

  if (facility_info.type != edit_info.type) {
    updatedKeys['type'] = edit_info.type;
  }

  if (facility_info.audience != edit_info.audience) {
    updatedKeys['audience'] = edit_info.audience;
  }

  if (facility_info.host_name != edit_info.host_name) {
    updatedKeys['host_name'] = edit_info.host_name;
  }

  if (facility_info.host_email != edit_info.host_email) {
    updatedKeys['host_email'] = edit_info.host_email;
  }

  if (facility_info.host_phone_number != edit_info.host_phone_number) {
    updatedKeys['host_phone_number'] = edit_info.host_phone_number;
  }

  if (facility_info.has_host != edit_info.has_host) {
    updatedKeys['has_host'] = edit_info.has_host;
  }

  if (facility_info.info != edit_info.info) {
    updatedKeys['info'] = {
      has_piano: edit_info.info.has_piano,
      has_sound_equipment: edit_info.info.has_sound_equipment,
      parking: edit_info.info.parking,
    };
  }

  if (!edit_info.has_host) {
    updatedKeys['host_name'] = null;
    updatedKeys['host_email'] = null;
    updatedKeys['host_phone_number'] = null;
  }

  if (Object.keys(updatedKeys).length > 0) {
    const { data, error } = await supabase
      .from('facilities')
      .update(updatedKeys)
      .eq('user_id', id);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}

export async function fetchFacilityById(facility_id: string) {
  const { data, error } = await supabase
    .from('facilities')
    .select('*')
    .eq('facility_id', facility_id)
    .single();
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function fetchFacilityContactByID(facility_id: UUID) {
  const { data, error } = await supabase
    .from('facility_contacts')
    .select('*')
    .eq('facility_id', facility_id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function fetchFacilityByUserID(
  user_id: string,
): Promise<Facilities | null> {
  const { data, error } = await supabase
    .from('facilities')
    .select('*')
    .eq('user_id', user_id)
    .single();

  if (error) {
    console.log(error.message);
    return null;
  }

  return data;
}

export async function fetchFacilityIDByUserID(user_id: string) {
  const { data, error } = await supabase
    .from('facilities')
    .select('facility_id')
    .eq('user_id', user_id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data?.facility_id;
}
