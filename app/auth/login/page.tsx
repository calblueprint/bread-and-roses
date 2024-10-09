'use client';

import { useState } from 'react';
import supabase from '../../../api/supabase/createClient';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [emailSentCount, setEmailSentCount] = useState(0);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSignUp = async e => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoggingIn(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setIsLoggingIn(false);

    if (error) {
      setErrorMessage(`Sign-up error: ${error.message}`);
    } else if (data.user) {
      setEmailSentCount(1);
      setSuccessMessage(
        'Sign-up successful! Please check your email for verification.',
      );
    } else {
      setErrorMessage('Unexpected error occurred during sign-up.');
    }
  };

  const handleSignIn = async e => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoggingIn(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoggingIn(false);

    if (error) {
      setErrorMessage(`Login error: ${error.message}`);
    } else if (data.user) {
      setSuccessMessage('Login successful!');
    }
  };

  const handleResendEmail = async e => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const { error } = await supabase.auth.resend({
      email,
      type: 'signup',
    });

    if (error) {
      setErrorMessage(`Resend error: ${error.message}`);
    } else {
      setEmailSentCount(emailSentCount + 1);
      setSuccessMessage('Verification email resent! Please check your inbox.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <h2>{isLoggingIn ? 'Loading...' : 'Login / Sign Up'}</h2>

      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}

      <form onSubmit={emailSentCount === 0 ? handleSignUp : handleResendEmail}>
        <div style={{ marginBottom: '1rem' }}>
          <label
            htmlFor="email"
            style={{ display: 'block', marginBottom: '.5rem' }}
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            style={{ padding: '.5rem', width: '300px', marginBottom: '1rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label
            htmlFor="password"
            style={{ display: 'block', marginBottom: '.5rem' }}
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            style={{ padding: '.5rem', width: '300px', marginBottom: '1rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          {emailSentCount === 0 ? (
            <>
              <button type="submit" style={{ padding: '.5rem 1rem' }}>
                Sign up
              </button>
              <button
                type="button"
                onClick={handleSignIn}
                style={{ padding: '.5rem 1rem' }}
              >
                Sign in
              </button>
            </>
          ) : (
            <button type="submit" style={{ padding: '.5rem 1rem' }}>
              Resend Email
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
