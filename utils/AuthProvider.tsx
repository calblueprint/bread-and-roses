'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AuthResponse, Session } from '@supabase/supabase-js';
import supabase from '@/api/supabase/createClient';

export interface AuthState {
  session: Session | null;
  signIn: (newSession: Session | null) => void;
  signUp: (email: string, password: string) => Promise<AuthResponse>;
  signInWithEmail: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => void;
  userRole: 'volunteer' | 'facility' | null;
}

const AuthContext = createContext({} as AuthState);

export function useSession() {
  return useContext(AuthContext);
}

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<'volunteer' | 'facility' | null>(
    null,
  );

  // Initialize session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: newSession } }) => {
      setSession(newSession);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      setSession(newSession);

      if (event === 'PASSWORD_RECOVERY') {
        localStorage.setItem('passwordRecoveryMode', 'true');
        router.push('/resetpassword');
      }

      if (event === 'USER_UPDATED') {
        const isInRecovery =
          localStorage.getItem('passwordRecoveryMode') === 'true';
        if (isInRecovery && pathname === '/resetpassword') return;
        localStorage.removeItem('passwordRecoveryMode');
      }

      if (
        (event === 'SIGNED_IN' || event === 'USER_UPDATED') &&
        pathname === '/verification'
      ) {
        const confirmed = newSession?.user?.email_confirmed_at;
        if (confirmed && window.location.pathname === '/verification') {
          router.push('/success');
        }
      }

      if (event === 'SIGNED_OUT') {
        setUserRole(null);
      }
    });

    const syncSessionAcrossTabs = async (event: StorageEvent) => {
      if (event.key === 'supabase.auth.token-signal') {
        const {
          data: { session: updatedSession },
        } = await supabase.auth.getSession();
        setSession(updatedSession || null);

        if (!updatedSession && pathname !== '/signin') {
          router.push('/signin');
        }
      }
    };

    window.addEventListener('storage', syncSessionAcrossTabs);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('storage', syncSessionAcrossTabs);
    };
  }, [router, pathname]);

  // Fetch user role
  useEffect(() => {
    async function fetchUserRole(
      email: string,
    ): Promise<'volunteer' | 'facility' | null> {
      const { data: volunteerData } = await supabase
        .from('volunteers')
        .select('user_id')
        .eq('email', email)
        .maybeSingle();
      if (volunteerData) return 'volunteer';

      const { data: facilityData } = await supabase
        .from('facility_contacts')
        .select('user_id')
        .eq('email', email)
        .maybeSingle();
      if (facilityData) return 'facility';

      return null;
    }

    if (session?.user?.email) {
      fetchUserRole(session.user.email).then(role => {
        setUserRole(role);
        console.log('User role set to:', role);
      });
    } else {
      setUserRole(null);
    }
  }, [session]);

  const signIn = (newSession: Session | null) => {
    setSession(newSession);
  };

  const signInWithEmail = async (email: string, password: string) => {
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return response;
  };

  const signUp = async (email: string, password: string) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'http://localhost:3000/verification',
      },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.setItem('supabase.auth.token-signal', `${Date.now()}`);
    setSession(null);
    setUserRole(null);
  };

  const authContextValue = useMemo(
    () => ({
      session,
      signIn,
      signUp,
      signInWithEmail,
      signOut,
      userRole,
    }),
    [session, userRole],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
