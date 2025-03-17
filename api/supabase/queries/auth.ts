import supabase from '@/api/supabase/createClient';
import { encryptEmail } from '@/utils/emailTokenUtils';

export async function handleSignUp(
  email: string,
  password: string,
): Promise<{ success: boolean; message: string }> {
  localStorage.removeItem('supabase.auth.token-signal');
  try {
    await ensureLoggedOutForNewUser(email);

    const redirectUrl = `${window.location.origin}/success`;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });

    if (error) {
      return {
        success: false,
        message: `Sign-up failed: ${error.message}`,
      };
    }

    const identities = data?.user?.identities;
    const isNewUser = identities && identities.length > 0;

    if (!isNewUser) {
      return {
        success: false,
        message:
          'An account with this email already exists. Please log in instead.',
      };
    }

    return { success: true, message: 'Sign-up successful!' };
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, message: `Sign-up failed: ${err.message}` };
    }
    return {
      success: false,
      message: 'Sign-up failed: An unknown error occurred.',
    };
  }
}

export async function handleSignIn(
  email: string,
  password: string,
): Promise<{
  success: boolean;
  message: string;
  redirectTo?: 'verification' | 'roles' | 'discover';
}> {
  localStorage.removeItem('supabase.auth.token-signal');
  try {
    await ensureLoggedOutForNewUser(email);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError?.message === 'Email not confirmed') {
      return {
        success: false,
        message: 'Please verify your email before logging in.',
        redirectTo: 'verification',
      };
    }

    if (signInError) {
      return {
        success: false,
        message: `Login failed: ${signInError.message}`,
      };
    }

    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError || !sessionData?.session) {
      return {
        success: false,
        message: 'Failed to retrieve session after login.',
      };
    }

    const { data: volunteerData } = await supabase
      .from('volunteers')
      .select('user_id')
      .eq('email', email)
      .maybeSingle();

    const { data: facilityData } = await supabase
      .from('facility_contacts')
      .select('user_id')
      .eq('email', email)
      .maybeSingle();

    const onboarded = volunteerData || facilityData;

    if (onboarded) {
      return {
        success: true,
        message: 'Login successful!',
        redirectTo: 'discover',
      };
    } else {
      return {
        success: true,
        message: 'Login successful! Needs onboarding.',
        redirectTo: 'roles',
      };
    }
  } catch (err) {
    if (err instanceof Error) {
      return { success: false, message: `Login failed: ${err.message}` };
    }
    return {
      success: false,
      message: 'Login failed: An unknown error occurred.',
    };
  }
}

export const handleSignOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error during logout:', error.message);
    return;
  }
};

export async function sendPasswordResetEmail(
  email: string,
): Promise<{ success: boolean; message: string }> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      return {
        success: false,
        message: `Password reset failed: ${error.message}`,
      };
    }
    return {
      success: true,
      message: 'Password reset email sent successfully.',
    };
  } catch (err) {
    return {
      success: false,
      message: 'An unexpected error occurred while sending reset email.',
    };
  }
}

export async function updatePassword(
  newPassword: string,
): Promise<{ success: boolean; message: string }> {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return {
        success: false,
        message: `Password update failed: ${error.message}`,
      };
    }

    return {
      success: true,
      message: 'Password updated successfully! Redirecting...',
    };
  } catch (err) {
    return {
      success: false,
      message: 'An unexpected error occurred while updating password.',
    };
  }
}

export async function ensureLoggedOutForNewUser(
  newEmail: string,
): Promise<void> {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error('Error fetching session:', error.message);
    throw new Error('Failed to fetch session.');
  }

  const session = data.session;

  if (
    session &&
    session.user &&
    session.user.email &&
    session.user.email !== newEmail
  ) {
    console.log(`Logging out current user: ${session.user.email}`);
    await handleSignOut();
  }
}

export async function checkUserExists(
  userId: string,
  userType: 'volunteer' | 'facility',
): Promise<boolean> {
  try {
    const table = userType === 'volunteer' ? 'volunteers' : 'facilities';

    const { data, error } = await supabase
      .from(table)
      .select('user_id')
      .eq('user_id', userId)
      .single();

    if (error || !data) {
      return false;
    }
    return true;
  } catch (err) {
    console.error('Error checking user existence:', err);
    return false;
  }
}

export async function resendVerificationEmail(email: string): Promise<string> {
  try {
    const redirectUrl = `${window.location.origin}/success`;

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: redirectUrl,
      },
    });

    if (error) {
      return `Error: ${error.message}`;
    }

    return 'Verification email resent successfully!';
  } catch (err) {
    return 'Unexpected error while resending verification email.';
  }
}

export function getTempEmail(): string | null {
  return localStorage.getItem('tempEmail');
}
