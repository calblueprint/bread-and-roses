'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { updatePassword } from '@/api/supabase/queries/auth';
import BRLogo from '@/public/images/b&r-logo.png';
import Back from '@/public/images/back.svg';
import { H5 } from '@/styles/text';
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
  Instructions,
  Label,
  Link,
  Logo,
  TitleUnderline,
} from '../auth-styles';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const { signOut } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setIsError(true);
      return;
    }

    const { success, message } = await updatePassword(password);
    setMessage(message);
    setIsError(!success);

    if (success) {
      localStorage.removeItem('passwordRecoveryMode');
      router.push('/signin');
      await signOut();
      setTimeout(() => {
        router.push('/signin');
      }, 1500);
    }
  };

  return (
    <Container>
      <Logo src={BRLogo} alt="B&R Logo" />
      <Card>
        <Form onSubmit={handleSubmit}>
          <Link href="/signin">
            <Image src={Back} alt="Back icon" />
          </Link>
          <H5>Reset Password</H5>
          <TitleUnderline width="182px" />
          <Instructions $fontWeight={400}>
            Enter and confirm your new password below.
          </Instructions>

          <Fields>
            <div>
              <Label>
                New Password <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                type="password"
                name="password"
                placeholder="Enter new password"
                onChange={e => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>

            <div>
              <Label>
                Confirm New Password <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                onChange={e => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              />
            </div>
          </Fields>

          <Button type="submit">Reset Password</Button>

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
        Remembered your password? <Link href="/signin">Sign in!</Link>
      </Footer>
    </Container>
  );
}
