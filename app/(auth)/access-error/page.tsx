'use client';

import { useRouter } from 'next/navigation';
import BRLogo from '@/public/images/b&r-logo.png';
import { H5 } from '@/styles/text';
import { Button, Card, Container, Footer, Link, Logo } from '../auth-styles';

export default function AccessError() {
  const router = useRouter();

  return (
    <Container>
      <Logo src={BRLogo} alt="Bread & Roses logo" />
      <Card>
        <H5>You must be logged in to view this page.</H5>
        <Button onClick={() => router.push('/signin')}>Login</Button>
      </Card>
      <Footer>
        Don’t have an account? <Link href="/signup">Sign up!</Link>
      </Footer>
    </Container>
  );
}
