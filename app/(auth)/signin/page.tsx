'use client';

import { useState } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import isEmail from 'validator/lib/isEmail';
import { handleSignIn as signInUser } from '@/api/supabase/queries/auth';
import BRLogo from '@/public/images/b&r-logo.png';
import COLORS from '@/styles/colors';
import { H5, SMALL } from '@/styles/text';
import {
  AuthSpacer,
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

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const validEmail = (e: string) => e !== '' && isEmail(e);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setErrorMessage('');

    let hasError = false;
    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!validEmail(email)) {
      setEmailError('Invalid email');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    }

    if (hasError) return;

    setIsLoggingIn(true);

    const { success, message, redirectTo } = await signInUser(email, password);

    if (!success) {
      if (redirectTo === 'verification') {
        router.push('/verification');
      } else {
        setErrorMessage(message);
      }
      setIsLoggingIn(false);
      return;
    }

    router.push('/' + redirectTo);

    setErrorMessage('');
    setIsLoggingIn(false);
  };

  return (
    <Container>
      <Logo src={BRLogo} alt="Bread & Roses logo" />
      <Card>
        <Form onSubmit={handleSignIn}>
          <H5>Login</H5>
          <TitleUnderline />

          {errorMessage && (
            <StyledErrorMessage $isError={true}>
              {errorMessage}
            </StyledErrorMessage>
          )}

          <Fields>
            <div>
              <Label>
                Email <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                name="email"
                type="email"
                placeholder="jane.doe@gmail.com"
                onChange={e => setEmail(e.target.value)}
                value={email}
                aria-label="Email"
              />
              {emailError && (
                <SMALL
                  $color={COLORS.rose11}
                  $fontWeight={100}
                  $text-align="left"
                >
                  {emailError}
                </SMALL>
              )}
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
                aria-label="Password"
              />
              {passwordError && (
                <SMALL
                  $color={COLORS.rose11}
                  $font-weight={100}
                  $text-align="left"
                >
                  {passwordError}
                </SMALL>
              )}
            </div>
          </Fields>

          <AuthSpacer>
            <SMALL $fontWeight={400} $align="right">
              <Link href="/forgotpassword">Forgot Password?</Link>
            </SMALL>
          </AuthSpacer>

          <Button type="submit" disabled={isLoggingIn}>
            {isLoggingIn ? 'Logging In...' : 'Login'}
          </Button>
        </Form>
      </Card>

      <Footer>
        Don’t have an account? <Link href="/signup">Sign up!</Link>
      </Footer>
    </Container>
  );
}
