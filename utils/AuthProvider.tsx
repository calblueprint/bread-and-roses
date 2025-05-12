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
import { encryptEmail } from '@/utils/emailTokenUtils';

export interface AuthState {
  session: Session | null;
  signIn: (newSession: Session | null) => void;
  signUp: (email: string, password: string) => Promise<AuthResponse>;
  signInWithEmail: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => void;
  userRole: 'volunteer' | 'facility' | null;
  hydrated: boolean;
  sessionChecked: boolean;
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
  const [hydrated, setHydrated] = useState(false);
  const [sessionChecked, setSessionChecked] = useState(false);
  const [userRole, setUserRole] = useState<'volunteer' | 'facility' | null>(
    null,
  );

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Initialize session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: newSession } }) => {
      setSession(newSession);
      setSessionChecked(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      setSession(newSession);
      setSessionChecked(true);

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
        const isInRecovery =
          localStorage.getItem('passwordRecoveryMode') === 'true';
        if (isInRecovery && pathname === '/verification') {
          return;
        }

        const confirmed = newSession?.user?.email_confirmed_at;
        if (confirmed && window.location.pathname === '/verification') {
          router.push('/success');
        } else if (!confirmed && newSession?.user?.email) {
          const token = await encryptEmail(newSession.user.email);
          router.push(`/verification?token=${encodeURIComponent(token)}`);
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
        setSessionChecked(true);

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
    if (!hydrated || !session?.user?.email) {
      setUserRole(null);
      return;
    }

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

    fetchUserRole(session.user.email).then(role => {
      setUserRole(role);
      console.log('User role set to:', role);
    });
  }, [session, hydrated]);

  const signIn = (newSession: Session | null) => {
    localStorage.removeItem('supabase.auth.token-signal');
    setSession(newSession);
  };

  const signInWithEmail = async (email: string, password: string) => {
    localStorage.removeItem('supabase.auth.token-signal');
    return await supabase.auth.signInWithPassword({ email, password });
  };

  const signUp = async (email: string, password: string) => {
    localStorage.removeItem('supabase.auth.token-signal');
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/verification`,
      },
    });
  };

  const signOut = async () => {
    router.push('/');
    setTimeout(() => {
      supabase.auth.signOut();
    }, 300);
    localStorage.setItem('supabase.auth.token-signal', `${Date.now()}`);
    localStorage.removeItem('passwordRecoveryMode');
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
      hydrated,
      sessionChecked,
    }),
    [session, userRole, hydrated, sessionChecked],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
