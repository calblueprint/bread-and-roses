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
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSignUp = async () => {
    setMessage('');
    setIsError(false);

    if (password !== confirmedPassword) {
      setMessage('Sign-up failed: Passwords do not match');
      setIsError(true);
      return;
    }

    const token = await encryptEmail(email);
    const { success, message } = await signUpUser(email, password);

    setIsError(!success);
    setMessage(message);

    if (success) {
      setTimeout(() => {
        router.push(`/verification?token=${encodeURIComponent(token)}`);
      }, 1000);
    }
  };

  // Front-end interface
  return (
    <Container>
      <Logo src={BRLogo} alt="An example image" />
      <Card>
        <Form>
          <H5>Sign Up</H5>
          <TitleUnderline width="5.625rem" />
          {message && (
            <StyledErrorMessage $isError={isError}>
              {message}
            </StyledErrorMessage>
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
