'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleSignIn as signInUser } from '@/api/supabase/queries/auth';
import BRLogo from '@/public/images/b&r-logo.png';
import { H5 } from '@/styles/text';
import {
  Button,
  Card,
  Container,
  Fields,
  Footer,
  ForgotPassword,
  Form,
  Input,
  Label,
  Link,
  LoginMessage,
  Logo,
  TitleUnderline,
} from '../auth-styles';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSignIn = async () => {
    setMessage('');
    setIsError(false);

    const { success, message } = await signInUser(email, password);

    setMessage(message);
    setIsError(!success);

    if (success) {
      router.push('/discover');
    }
  };

  return (
    <Container>
      <Logo src={BRLogo} alt="Bread & Roses logo" />
      <Card>
        <Form>
          <H5>Login</H5>
          <TitleUnderline />

          {/* Show error or success message */}
          {message && (
            <LoginMessage $isError={isError} role="alert">
              {message}
            </LoginMessage>
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
            </div>
          </Fields>

          {/* Forgot Password Link */}
          <ForgotPassword>
            <Link href="/forgotpassword">Forgot Password?</Link>
          </ForgotPassword>

          {/* Submit Button */}
          <Button onClick={handleSignIn}>Login</Button>
        </Form>
      </Card>

      {/* Footer */}
      <Footer>
        Don’t have an account? <Link href="/signup">Sign up!</Link>
      </Footer>
    </Container>
  );
}
