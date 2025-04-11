'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import Rose from '@/public/images/rose-greenbg.svg';
import COLORS from '@/styles/colors';
import { P } from '@/styles/text';
import { useSession } from '@/utils/AuthProvider';
import {
  Background,
  Image,
  InlineContainer,
  ReviewContainer,
  RoundedCornerButton,
  Title,
} from '../../../styles/styles';

export default function Success() {
  const router = useRouter();
  const { session } = useSession();

  const [hydrated, setHydrated] = useState(false);
  const [delayDone, setDelayDone] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setDelayDone(true), 1200);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!hydrated || !delayDone) return;

    const confirmed = session?.user?.email_confirmed_at;
    console.log('[Success] session:', session);
    console.log('[Success] email_confirmed_at:', confirmed);

    if (!session || !confirmed) {
      console.log('[Success] Redirecting to /access-error');
      router.push('/access-error');
    }
  }, [hydrated, delayDone, session, router]);

  if (!session || !session.user?.email_confirmed_at) {
    return null;
  }

  const handleContinue = () => {
    router.push('/roles');
  };

  return (
    <ProtectedRoute allowWithoutRole>
      <Background>
        <Image src={Rose} alt="Rose" />
        <InlineContainer>
          <ReviewContainer>
            <Title>Successfully verified!</Title>
            <P $fontWeight={400} $color={COLORS.gray12}>
              Your email has been verified. Please use this email address to
              login in the future.
            </P>
            <RoundedCornerButton
              $bgColor={COLORS.pomegranate12}
              width="100%"
              onClick={handleContinue}
            >
              <P $fontWeight={400} $color={COLORS.gray1}>
                Continue
              </P>
            </RoundedCornerButton>
          </ReviewContainer>
        </InlineContainer>
      </Background>
    </ProtectedRoute>
  );
}
