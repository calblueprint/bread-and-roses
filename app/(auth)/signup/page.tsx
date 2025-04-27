'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleSignUp as signUpUser } from '@/api/supabase/queries/auth';
import BRLogo from '@/public/images/b&r-logo.png';
import { H5 } from '@/styles/text';
import { encryptEmail } from '@/utils/emailTokenUtils';
import {
  Button,
  Card,
  Container,
  FieldError,
  Fields,
  Footer,
  Form,
  Input,
  Label,
  Link,
  Logo,
  StyledErrorMessage,
  TitleUnderline,
} from '../auth-styles';

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [fallbackError, setFallbackError] = useState('');

  const handleSignUp = async () => {
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setFallbackError('');

    if (password !== confirmedPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    const token = await encryptEmail(email);
    const { success, message } = await signUpUser(email, password);

    if (!success) {
      if (
        message.includes('Unable to validate email address') ||
        message.includes('An account with this email already exists')
      ) {
        setEmailError(message);
      } else if (message.includes('Password should be at least')) {
        setPasswordError('Password should be at least 6 characters');
      } else if (message.includes('Passwords do not match')) {
        setConfirmPasswordError('Passwords do not match');
      } else {
        setFallbackError(message);
      }
      return;
    }

    router.push(`/verification?token=${encodeURIComponent(token)}`);
  };

  return (
    <Container>
      <Logo src={BRLogo} alt="Bread & Roses logo" />
      <Card>
        <Form>
          <H5>Sign Up</H5>
          <TitleUnderline width="5.625rem" />

          {fallbackError && (
            <StyledErrorMessage $isError>{fallbackError}</StyledErrorMessage>
          )}

          <Fields>
            <div>
              <Label>
                Email <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                name="email"
                placeholder="jane.doe@gmail.com"
                onChange={e => setEmail(e.target.value)}
                value={email}
              />
              {emailError && <FieldError>{emailError}</FieldError>}
            </div>

            <div>
              <Label>
                Password <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
                value={password}
              />
              {passwordError && <FieldError>{passwordError}</FieldError>}
            </div>

            <div>
              <Label>
                Confirm Password <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                type="password"
                name="confirm password"
                placeholder="Confirm Password"
                onChange={e => setConfirmedPassword(e.target.value)}
                value={confirmedPassword}
              />
              {confirmPasswordError && (
                <FieldError>{confirmPasswordError}</FieldError>
              )}
            </div>
          </Fields>

          <Button
            type="button"
            onClick={handleSignUp}
            disabled={
              email.length === 0 ||
              password.length === 0 ||
              confirmedPassword.length === 0
            }
          >
            Create account
          </Button>
        </Form>
      </Card>

      <Footer>
        Already have an account? <Link href="/signin">Log in!</Link>
      </Footer>
    </Container>
  );
}
