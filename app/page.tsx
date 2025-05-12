'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BRLogo from '@/public/images/b&r-logo.png';
import { useSession } from '@/utils/AuthProvider';
import { Container, Image, Spinner } from './page.style';

export default function Home() {
  const router = useRouter();
  const { session, userRole, sessionChecked } = useSession();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!sessionChecked) return;
    setFadeOut(true);

    const redirectTimeout = setTimeout(() => {
      if (session) {
        if (!userRole) {
          router.replace('/roles');
        } else if (userRole === 'volunteer') {
          router.replace('/discover');
        } else if (userRole === 'facility') {
          router.replace('/availability/general');
        } else {
          router.replace('/');
        }
      } else {
        router.replace('/signin');
      }
    }, 600);

    return () => clearTimeout(redirectTimeout);
  }, [sessionChecked, session, userRole, router]);

  return (
    <Container $animateOut={fadeOut}>
      <Image src={BRLogo} alt="Bread & Roses logo" />
      <Spinner />
    </Container>
  );
}
