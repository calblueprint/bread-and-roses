'use client';

import { useState } from 'react';
import supabase from '../../../api/supabase/createClient';
import { H5 } from '../../../styles/text';
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

export default function SignUp() {
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

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    // Ik this wasn't part of the sprint but I added so I could verify that supabase functionality is working
    if (error) {
      setMessage(`Sign-up failed: ${error.message}`);
      setIsError(true);
    } else {
      setMessage('Sign-up successful!');
      setIsError(false);
    }
  };

  // Front-end interface
  return (
    <Container>
      <Header>Welcome</Header>
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
          <Button onClick={handleSignUp}>Sign Up</Button>
          <Separator>
            <span>or</span>
          </Separator>
          <GoogleButton>Continue with Google</GoogleButton>
          {message && <LoginMessage isError={isError}>{message}</LoginMessage>}
        </Form>
      </Card>
      <SmallBuffer />
      <Footer>
        Already have an account? <Link href="/auth/signin">Sign in!</Link>
      </Footer>
    </Container>
  );
}
