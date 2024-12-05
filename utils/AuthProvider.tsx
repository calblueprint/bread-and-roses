'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { AuthResponse, Session } from '@supabase/supabase-js';
import supabase from '@/api/supabase/createClient';

export interface AuthState {
  session: Session | null;
  signIn: (newSession: Session | null) => void;
  signUp: (email: string, password: string) => Promise<AuthResponse>;
  signInWithEmail: (email: string, password: string) => Promise<AuthResponse>;
  signOut: () => void;
}

const AuthContext = createContext({} as AuthState);

export function useSession() {
  const value = useContext(AuthContext);
  return value;
}

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: newSession } }) => {
      console.log('Initial session:', newSession);
      setSession(newSession);
    });

    supabase.auth.onAuthStateChange((_event, newSession) => {
      console.log('Session change event:', newSession);
      setSession(newSession);
    });
  }, []);

  const signIn = (newSession: Session | null) => {
    setSession(newSession);
  };

  const signInWithEmail = async (email: string, password: string) => {
    const response = supabase.auth.signInWithPassword({
      email,
      password,
    }); // will trigger the use effect to update the session

    return response;
  };

  const signUp = async (email: string, password: string) => {
    const response = await supabase.auth.signUp({
      email,
      password,
    }); // will trigger the use effect to update the session

    return response;
  };

  const signOut = () => {
    supabase.auth.signOut();
    localStorage.removeItem('tempEmail');
    setSession(null);
  };

  const authContextValue = useMemo(
    () => ({
      session,
      signIn,
      signUp,
      signInWithEmail,
      signOut,
    }),
    [session],
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
