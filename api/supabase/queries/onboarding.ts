import {
  FacilityGeneralInfo,
  FacilityInfo,
  Location,
} from '@/utils/facilityOnboardingContext';
import { GeneralInfo, Preferences, Role } from '@/utils/onboardingContext';
import supabase from '../createClient';

export async function submitOnboardingData(
  generalInfo: GeneralInfo,
  preferences: Preferences,
  role: Role,
): Promise<void> {
  try {
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError || !sessionData?.session) {
      console.error('Session retrieval error:', sessionError);
      throw new Error('Failed to retrieve user session.');
    }

    const user_id = sessionData.session.user.id;
    const email = sessionData.session.user.email;

    const volunteerPayload = {
      user_id,
      email,
      first_name: generalInfo.firstName,
      last_name: generalInfo.lastName,
      phone_number: generalInfo.phoneNumber,
      notifications_opt_in: generalInfo.notifications,
      social_media: generalInfo.socialMedia,
    };

    const { data: volunteerData, error: volunteerError } = await supabase
      .from('volunteers')
      .upsert([volunteerPayload], { onConflict: 'user_id' });

    if (volunteerError) {
      console.error('Error upserting volunteer data:', volunteerError);
      throw new Error(`Volunteer data error: ${volunteerError.message}`);
    }

    const preferencesPayload = {
      user_id,
      role: [
        ...(role.isPerformer ? ['performer'] : []),
        ...(role.isHost ? ['host'] : []),
      ],
      facility_type: preferences.facilityType,
      locations: preferences.location,
      audience_type: preferences.audience,
      performer_type: preferences.performerType,
      performance_type: preferences.performanceType,
      genre: preferences.genre,
      additional_info: preferences.additionalInfo,
      info: preferences.info,
    };

    const { data: preferencesData, error: preferencesError } = await supabase
      .from('volunteer_preferences')
      .insert([preferencesPayload]);

    if (preferencesError) {
      console.error('Error inserting preferences data:', preferencesError);
      throw new Error(`Preferences data error: ${preferencesError.message}`);
    }

    console.log('Onboarding data submitted successfully:', {
      volunteerData,
      preferencesData,
    });
  } catch (error) {
    console.error('Error during onboarding data submission:', error);
    throw error;
  }
}

export async function submitFacilityOnboardingData(
  facilityGeneralInfo: FacilityGeneralInfo,
  location: Location,
): Promise<void> {
  try {
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError || !sessionData?.session) {
      console.error('Session retrieval error:', sessionError);
      throw new Error('Failed to retrieve user session.');
    }

    const user_id = sessionData.session.user.id;
    const email = sessionData.session.user.email;

    const facilityPayload = {
      name: facilityGeneralInfo.facilityName,
      county: location.county,
      city: location.city,
      street_address_1: location.address,
      street_address_2: location.address2,
      audience: [],
      type: '',
      user_id: user_id,
      is_approved: false,
      info: '',
      zip: location.zipCode,
      is_finalized: false,
      has_host: facilityGeneralInfo.has_host,
      is_changing_facility_contact:
        facilityGeneralInfo.changing_facility_contact,
      ...(facilityGeneralInfo.has_host && {
        host_name:
          facilityGeneralInfo.firstName + ' ' + facilityGeneralInfo.lastName,
        host_phone_number: facilityGeneralInfo.phoneNumber,
        host_email: email,
      }),
    };

    const { data: facilityData, error: facilityError } = await supabase
      .from('facilities')
      .insert([facilityPayload])
      .select('facility_id')
      .single();

    if (facilityError) {
      console.error('Error inserting facility data:', facilityError);
      throw new Error(`Facility data error: ${facilityError.message}`);
    }

    const facility_id = facilityData?.facility_id;

    if (!facility_id) {
      throw new Error('Failed to retrieve facility ID after insertion.');
    }

    const facilityContactPayload = {
      user_id: user_id,
      email: email,
      first_name: facilityGeneralInfo.firstName,
      last_name: facilityGeneralInfo.lastName,
      phone_number: facilityGeneralInfo.phoneNumber,
      facility_id: facility_id,
    };

    const { error: facilityContactError } = await supabase
      .from('facility_contacts')
      .upsert([facilityContactPayload], { onConflict: 'user_id' });

    if (facilityContactError) {
      console.error('Error upserting volunteer data:', facilityContactError);
      throw new Error(`Volunteer data error: ${facilityContactError.message}`);
    }
  } catch (error) {
    console.error('Error during onboarding data submission:', error);
    throw error;
  }
}

export async function fetchCurrentUserFacility(user_id?: string) {
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError || !sessionData?.session) {
    console.error('Session retrieval error:', sessionError);
    throw new Error('Failed to retrieve user session.');
  }

  user_id = user_id != null ? user_id : sessionData.session.user.id;

  const { data: facility, error: facility_error } = await supabase
    .from('facilities')
    .select(
      'name, is_approved, street_address_1, street_address_2, city, zip, county',
    )
    .eq('user_id', user_id)
    .single();

  if (facility_error) {
    console.error('Error getting facility details: ', facility_error);
  }

  return facility;
}

export async function submitFullFacilityOnboardingData(
  generalInfo: FacilityGeneralInfo,
  specificInfo: FacilityInfo,
): Promise<void> {
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError || !sessionData?.session) {
    console.error('Session retrieval error:', sessionError);
    throw new Error('Failed to retrieve user session.');
  }

  const user_id = sessionData.session.user.id;

  const facilityPayload = {
    name: generalInfo.facilityName,
    audience: generalInfo.audience,
    type: generalInfo.facilityType,
    directions: generalInfo.directions,
    capacity: generalInfo.capacity,
    is_finalized: true,
    admin_notes: specificInfo.admin_notes,
    volunteer_notes: specificInfo.volunteer_notes,
    info: {
      has_piano: specificInfo.has_piano,
      has_sound_equipment: specificInfo.has_sound_equipment,
      parking: specificInfo.parking,
    },
  };

  const { error: facilityError } = await supabase
    .from('facilities')
    .update([facilityPayload])
    .eq('user_id', user_id);

  if (facilityError) {
    console.error('Error inserting facility data:', facilityError);
    throw new Error(`Facility data error: ${facilityError.message}`);
  }
}
