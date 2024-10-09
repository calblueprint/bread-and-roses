'use client';

import { useContext, useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import supabase from '@/api/supabase/createClient';
import PasswordComplexity from '@/components/PasswordComplexity';
import TextInput from '@/components/TextInput/index';
import AuthContext from '@/context/AuthContext'; // Assuming this is the path to AuthContext

import CONFIG from '@/lib/configs';

export const useAuth = () => useContext(AuthContext);

export default function SignUp() {
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailSentCount, setEmailSentCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordComplexity, setPasswordComplexity] = useState(false);

  const validEmail = (e: string) => e !== '' && isEmail(e);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!auth) return;

    setEmailError(validEmail(email) ? '' : 'Invalid email');
    setPasswordError(password !== '' ? '' : 'Invalid password');

    if (!validEmail(email) || password === '') {
      setErrorMessage('');
      return;
    }

    if (!passwordComplexity) {
      setPasswordError('Password must meet complexity requirements.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setEmailError('');
    setPasswordError('');

    const { error } = await auth.signUp(email, password, {
      emailRedirectTo: CONFIG.emailVerified,
    });

    if (error) {
      setErrorMessage(error.message);
      await auth.signOut();
    } else {
      setEmailSentCount(1);
      setErrorMessage('');
    }
  };

  const handleResendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: CONFIG.emailVerified,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setEmailSentCount(emailSentCount + 1);
      setErrorMessage('');
    }
  };

  return emailSentCount === 0 ? (
    <form onSubmit={handleSignUp}>
      <div>
        <h1>Sign Up</h1>
        {errorMessage !== '' && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
      <TextInput
        label="Email"
        placeholder="email@example.com"
        errorText={emailError}
        type="email"
        id="email"
        value={email}
        setValue={setEmail}
      />
      <div>
        <TextInput
          label="Password"
          placeholder="Password"
          errorText={passwordError}
          type="password"
          id="password"
          value={password}
          setValue={setPassword}
        />
        <PasswordComplexity
          password={password}
          setComplexity={setPasswordComplexity}
        />
      </div>
      <TextInput
        label="Confirm Password"
        placeholder="Confirm Password"
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        setValue={setConfirmPassword}
      />
      <div>
        <button type="submit">Sign Up</button>
        <p>
          Have an account already? <a href={CONFIG.login}>Log in</a>
        </p>
      </div>
    </form>
  ) : (
    <form onSubmit={handleResendEmail}>
      <div>
        <p>Verification email sent!</p>
        <p>
          This link will direct you to the next step. If you didn’t receive an
          email, please click Resend Email.
        </p>
        <button type="submit">Resend Email</button>
        {emailSentCount > 1 && (
          <p>
            Email has been sent to <span>{email}</span>
          </p>
        )}
      </div>
    </form>
  );
}
