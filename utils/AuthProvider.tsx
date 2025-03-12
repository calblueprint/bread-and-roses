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
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<'volunteer' | 'facility' | null>(
    null,
  );
  const pathname = usePathname();

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

      if (event === 'SIGNED_IN') {
        const isInRecovery =
          localStorage.getItem('passwordRecoveryMode') === 'true';
        if (!isInRecovery) {
          const email = newSession?.user?.email;

          if (email) {
            const { data: volunteerData } = await supabase
              .from('volunteers')
              .select('user_id')
              .eq('email', email)
              .maybeSingle();

            if (volunteerData) {
              router.push('/discover');
              return;
            }

            const { data: facilityData } = await supabase
              .from('facility_contacts')
              .select('user_id')
              .eq('email', email)
              .maybeSingle();

            if (facilityData) {
              router.push('/availability/general');
              return;
            }
          }
        }
      }

      if (event === 'USER_UPDATED') {
        const isInRecovery =
          localStorage.getItem('passwordRecoveryMode') === 'true';
        if (isInRecovery && pathname === '/resetpassword') {
          return;
        }
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

    return () => subscription.unsubscribe();
  }, [router, pathname]);

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

    if (session && session.user && session.user.email) {
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
    const response = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'http://localhost:3000/verification',
      },
    });
    return response;
  };

  const signOut = () => {
    supabase.auth.signOut();
    localStorage.removeItem('tempEmail');
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
