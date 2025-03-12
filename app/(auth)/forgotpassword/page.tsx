'use client';

import { useState } from 'react';
import Image from 'next/image';
import { sendPasswordResetEmail } from '@/api/supabase/queries/auth';
import BRLogo from '@/public/images/b&r-logo.png';
import Back from '@/public/images/back.svg';
import { H5 } from '@/styles/text';
import {
  AuthSpacer,
  Button,
  Card,
  Container,
  Footer,
  Form,
  Input,
  Instructions,
  Label,
  Link,
  Logo,
  TitleUnderline,
} from '../auth-styles';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { success, message } = await sendPasswordResetEmail(email);
    setIsLoading(false);
    setIsError(!success);
    setMessage(message);
  };

  return (
    <Container>
      <Logo src={BRLogo} alt="B&R Logo" />
      <Card>
        <Form onSubmit={handleSubmit}>
          <Link href="/signin">
            <Image src={Back} alt="Back icon" />
          </Link>
          <H5>Forgot Password?</H5>
          <TitleUnderline width="208px" />
          <Instructions $fontWeight={200}>
            We&apos;ll send you an email to reset your password.
          </Instructions>
          <Label>
            Email <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            name="email"
            type="email"
            placeholder="jane.doe@gmail.com"
            onChange={e => setEmail(e.target.value)}
            value={email}
            required
          />
          <Button disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Email'}
          </Button>
          <AuthSpacer>
            {message && (
              <Instructions
                $fontWeight={400}
                style={{ color: isError ? 'red' : 'green' }}
              >
                {message}
              </Instructions>
            )}
          </AuthSpacer>
        </Form>
      </Card>
      <Footer>
        Already have an account? <Link href="/signin">Sign in!</Link>
      </Footer>
    </Container>
  );
}
