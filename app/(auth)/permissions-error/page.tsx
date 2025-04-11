'use client';

import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import BRLogo from '@/public/images/b&r-logo.png';
import { H5 } from '@/styles/text';
import { Button, Card, Container, Footer, Link, Logo } from '../auth-styles';

export default function PermissionsError() {
  const router = useRouter();

  return (
    <ProtectedRoute allowWithoutRole>
      <Container>
        <Logo src={BRLogo} alt="Bread & Roses logo" />
        <Card>
          <H5>You don’t have permission to view this page.</H5>
          <Button onClick={() => router.back()}>Go Back</Button>
        </Card>
        <Footer>
          Need a different account? <Link href="/signin">Sign in</Link>
        </Footer>
      </Container>
    </ProtectedRoute>
  );
}
