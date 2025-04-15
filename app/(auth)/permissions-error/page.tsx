'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchFacilityApprovalStatus } from '@/api/supabase/queries/permissions';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import BRLogo from '@/public/images/b&r-logo.png';
import { H5 } from '@/styles/text';
import { useSession } from '@/utils/AuthProvider';
import { Button, Card, Container, Footer, Link, Logo } from '../auth-styles';

export default function PermissionsError() {
  const router = useRouter();
  const { session, userRole } = useSession();
  const [isApproved, setIsApproved] = useState<boolean | null>(null);

  useEffect(() => {
    async function fetchApproval() {
      if (userRole === 'facility' && session?.user?.id) {
        const approved = await fetchFacilityApprovalStatus(session.user.id);
        setIsApproved(approved);
      }
    }

    fetchApproval();
  }, [userRole, session]);

  const handleGoBack = () => {
    if (!userRole) {
      router.push('/roles');
    } else if (userRole === 'volunteer') {
      router.push('/discover');
    } else if (userRole === 'facility') {
      if (isApproved === false) {
        router.push('/onboarding/facility/status');
      } else {
        router.push('/availability/general');
      }
    } else {
      router.push('/');
    }
  };

  return (
    <ProtectedRoute allowWithoutRole>
      <Container>
        <Logo src={BRLogo} alt="Bread & Roses logo" />
        <Card>
          <H5>You don’t have permission to view this page.</H5>
          <Button onClick={handleGoBack}>Go Back</Button>
        </Card>
        <Footer>
          Need a different account? <Link href="/signin">Sign in</Link>
        </Footer>
      </Container>
    </ProtectedRoute>
  );
}
