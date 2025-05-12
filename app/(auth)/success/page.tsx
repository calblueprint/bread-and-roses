'use client';

import { useEffect } from 'react';
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
  const { session, userRole } = useSession();

  useEffect(() => {
    if (session && userRole) {
      if (userRole === 'volunteer') {
        router.push('/discover');
      } else if (userRole === 'facility') {
        router.push('/availability/general');
      }
    }
  }, [session, userRole, router]);

  const handleContinue = () => {
    router.push('/roles');
  };

  return (
    <ProtectedRoute allowWithoutRole>
      <Background>
        <Image src={Rose} alt="Rose" />
        <InlineContainer>
          <ReviewContainer>
            <Title $color={COLORS.gray12}>Successfully verified!</Title>
            <P $fontWeight={400} $color={COLORS.gray12}>
              Your email has been verified, please use this email to login in
              the future.
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
