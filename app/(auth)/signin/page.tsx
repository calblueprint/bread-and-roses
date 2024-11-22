'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleSignIn as signInUser } from '@/api/supabase/queries/auth';
// import supabase from '@/api/supabase/createClient';
import BRLogo from '@/public/images/b&r-logo.png';
import COLORS from '@/styles/colors';
import { H5, SMALL } from '@/styles/text';
import {
  Button,
  Card,
  Container,
  Footer,
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [message, setMessage] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isError, setIsError] = useState(false);

  const handleSignIn = async () => {
    setMessage('');
    setIsError(false);

    const { success, message } = await signInUser(email, password);
    setMessage(message);
    setIsError(!success);
    if (success) {
      setTimeout(() => {
        router.push('/activeEvents');
      }, 1000);
    }
  };

  return (
    <Container>
      <Logo src={BRLogo} alt="An example image" />
      <Card>
        <Form>
          <H5>Login</H5>
          <TitleUnderline />
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
          {/* need to change this to a link */}
          <SMALL $fontWeight="400" $color={COLORS.lilac9} $align="right">
            <Link href="/forgotpassword">Forgot Password?</Link>
          </SMALL>
          <Button onClick={handleSignIn}>Login</Button>
          {message && <LoginMessage isError={isError}>{message}</LoginMessage>}
        </Form>
      </Card>
      <Footer>
        Don’t have an account? <Link href="/signup">Sign up!</Link>
      </Footer>
    </Container>
  );
}
