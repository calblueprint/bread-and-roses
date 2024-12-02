import { GeneralInfo, Preferences } from '@/utils/onboardingContext';
import supabase from '../createClient';

export async function submitOnboardingData(
  generalInfo: GeneralInfo,
  preferences: Preferences,
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
          facility_type: preferences.facilityType,
          city: preferences.location,
          audience: preferences.audience,
          instruments: preferences.preferredEquipment,
          type_of_act: preferences.typeOfAct,
          genre: preferences.genre,
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
