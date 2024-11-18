'use client';

import { useState } from 'react';
import Image from 'next/image';
import BRLogo from '@/public/images/b&r-logo.png';
import Back from '@/public/images/back.svg';
import { H5 } from '@/styles/text';
import {
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

export default function SignIn() {
  const [email, setEmail] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [password, setPassword] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [message, setMessage] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isError, setIsError] = useState(false);

  return (
    <Container>
      <Logo src={BRLogo} alt="An example image" />
      <Card>
        <Form>
          <Link href="/onboarding/general">
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
            placeholder="jane.doe@gmail.com"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
          <Button>Send Email</Button>
        </Form>
      </Card>
      <Footer>
        Already have an account? <Link href="/signin">Sign in!</Link>
      </Footer>
    </Container>
  );
}
