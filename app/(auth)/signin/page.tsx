'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import isEmail from 'validator/lib/isEmail';
import { handleSignIn as signInUser } from '@/api/supabase/queries/auth';
import { fetchFacilityByUserID } from '@/api/supabase/queries/facilities';
import BRLogo from '@/public/images/b&r-logo.png';
import COLORS from '@/styles/colors';
import { H5, SMALL } from '@/styles/text';
import { useSession } from '@/utils/AuthProvider';
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
  const { session, userRole } = useSession();

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

    if (redirectTo === 'discover') {
      return;
    } else if (redirectTo === 'roles') {
      router.push('/roles');
    }

    setErrorMessage('');
    setIsLoggingIn(false);
  };

  // Once session and userRole are set, redirect appropriately.
  useEffect(() => {
    const redirectUser = async () => {
      if (!session) {
        return;
      }
      //different possibilities: didn't verify email -> verify, verified email but didn't onboard -> push to role selection, verified email and onboarded -> push to regular page

      //if userRole not found -> push to role selection

      console.log('user Role is', userRole);
      if (!userRole) {
        router.push('/roles');
      } else if (userRole === 'volunteer') {
        router.push('/discover');
      } else if (userRole === 'facility') {
        try {
          const facility = await fetchFacilityByUserID(session.user.id);
          if (!facility) {
            //no onboarding was done at all but role as facility was selected
            router.push('onboarding/facility/basic-information');
          } else if (!facility.is_finalized) {
            //first part of onboarding was done, but post approval onboarding was not done
            router.push('onboarding/facility/status');
          } else {
            //all onboarding was completed
            router.push('/availability/general');
          }
        } catch (error) {
          console.error('Error fetching facility status:', error);
        }
      }
    };

    redirectUser();
  }, [session, userRole, router]);

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
