import supabase from '@/api/supabase/createClient';

export async function handleSignUp(
  email: string,
  password: string,
): Promise<{ success: boolean; message: string }> {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return { success: false, message: `Sign-up failed: ${error.message}` };
    }

    const user = data.user;
    if (!user) {
      return {
        success: false,
        message: 'Sign-up failed: User was not created.',
      };
    }

    const { error: insertError } = await supabase.from('volunteers').insert([
      {
        user_id: user.id,
        email,
        first_name: '',
        last_name: '',
        phone_number: '',
        notifications_opt_in: true, // default value
      },
    ]);

    if (insertError) {
      if (insertError.message.includes('volunteers_user_id_fkey')) {
        return {
          success: false,
          message: 'An account with this email already exists.',
        };
      }
      return {
        success: false,
        message: `Error storing user data: ${insertError.message}`,
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
): Promise<{ success: boolean; message: string }> {
  try {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

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
        message: 'Failed to retrieve session information after login.',
      };
    }

    const user_id = sessionData.session.user.id;

    const userExists = await checkUserExists(user_id, 'volunteer');

    if (!userExists) {
      return { success: false, message: 'User not found in volunteers table.' };
    }

    return { success: true, message: 'Login successful!' };
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
