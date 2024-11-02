'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/api/supabase/createClient';
import { H5 } from '@/styles/text';
import { useSession } from '@/utils/AuthProvider';
import {
  Button,
  Card,
  Container,
  Footer,
  Form,
  GoogleButton,
  Header,
  Input,
  Label,
  Link,
  LoginMessage,
  Separator,
  SmallBuffer,
} from '../auth-styles';

export default function SignIn() {
  const router = useRouter();
  const sessionHandler = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // handle sign in w/ supabase, borrowed from Immigration Justice PR
  const handleSignIn = async () => {
    setMessage('');
    setIsError(false);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setMessage(`Login failed: ${error.message}`);
      setIsError(true);
    } else {
      try {
        const { error } = await sessionHandler.signInWithEmail(email, password);
        if (error) {
          setMessage(`Login failed: ${error.message}`);
          setIsError(true);
        } else {
          setMessage('Login successful!');
          setIsError(false);
          setTimeout(() => {
            router.push('/sessionDemo');
          }, 1000);
        }
      } catch (error) {
        if (error instanceof Error) {
          setMessage(`Login failed: ${error.message}`);
        } else {
          setMessage('Login failed: An unknown error occurred');
        }
        setIsError(true);
      }
    }
  };

  // Front-end interface
  return (
    <Container>
      <Header>Welcome Back!</Header>
      <SmallBuffer />
      <Card>
        <Form>
          <H5>Login</H5>
          <SmallBuffer />
          <Label>
            Email <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            name="email"
            placeholder="jane.doe@gmail.com"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
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
          <Button onClick={handleSignIn}>Sign In</Button>
          <Separator>
            <span>or</span>
          </Separator>
          <GoogleButton>Continue with Google</GoogleButton>
          {message && <LoginMessage $isError={isError}>{message}</LoginMessage>}
        </Form>
      </Card>
      <SmallBuffer />
      <Footer>
        Don’t have an account? <Link href="/signup">Sign up!</Link>
      </Footer>
    </Container>
  );
}
