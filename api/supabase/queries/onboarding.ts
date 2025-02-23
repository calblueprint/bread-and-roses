import {
  FacilityGeneralInfo,
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
  FacilityGeneralInfo: FacilityGeneralInfo,
  location: Location,
): Promise<void> {}
