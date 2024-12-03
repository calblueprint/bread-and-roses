import { GeneralInfo, Preferences, Role } from '@/utils/onboardingContext';
import supabase from '../createClient';

export async function submitOnboardingData(
  generalInfo: GeneralInfo,
  preferences: Preferences,
  role: Role,
): Promise<void> {
  try {
    const { data: volunteerData, error: volunteerError } = await supabase
      .from('volunteers')
      .insert([
        {
          first_name: generalInfo.firstName,
          last_name: generalInfo.lastName,
          phone_number: generalInfo.phoneNumber,
        },
      ]);

    if (volunteerError)
      throw new Error(`Volunteer data error: ${volunteerError.message}`);

    const { data: preferencesData, error: preferencesError } = await supabase
      .from('volunteer_preferences')
      .insert([
        {
          role: [
            role.isPerformer ? 'performer' : null,
            role.isHost ? 'host' : null,
          ].filter(Boolean),
          facility_type: preferences.facilityType,
          locations: preferences.location,
          audience_type: preferences.audience,
          performer_type: preferences.typeOfAct,
          genre: preferences.genre,
          grouping: preferences.grouping,
        },
      ]);

    if (preferencesError)
      throw new Error(`Preferences data error: ${preferencesError.message}`);

    console.log('Onboarding data submitted successfully:', {
      volunteerData,
      preferencesData,
    });
  } catch (error) {
    console.error('Error submitting onboarding data:', error);
  }
}
