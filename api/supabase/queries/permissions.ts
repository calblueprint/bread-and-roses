import supabase from '@/api/supabase/createClient';

export async function fetchFacilityApprovalStatus(
  userId: string,
): Promise<boolean> {
  const { data, error } = await supabase
    .from('facilities')
    .select('is_approved')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error(
      '[fetchFacilityApprovalStatus] Error fetching approval status:',
      error.message,
    );
    return false;
  }

  return data?.is_approved ?? false;
}

export async function fetchFacilityFinalizationStatus(
  userId: string,
): Promise<boolean> {
  const { data, error } = await supabase
    .from('facilities')
    .select('is_finalized')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error(
      '[fetchFacilityFinalizationStatus] Error fetching finalization status:',
      error.message,
    );
    return false;
  }

  return data?.is_finalized ?? false;
}
