'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
      setTimeout(() => {
        if (userRole === 'volunteer') {
          router.push('/discover');
        } else if (userRole === 'facility') {
          router.push('/availability/general');
        }
      }, 500);
    }
  }, [session, userRole, router]);

  const handleContinue = () => {
    setTimeout(() => {
      router.push('/roles');
    }, 500);
  };

  return (
    <Background>
      <Image src={Rose} alt="Rose" />
      <InlineContainer>
        <ReviewContainer>
          <Title>Successfully verified!</Title>
          <P $fontWeight={400} $color={COLORS.gray12}>
            Your email has been verified. Please use this email address to login
            in the future.
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
  );
}
