'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/api/supabase/createClient';
import Rose from '@/public/images/rose-greenbg.svg';
import {
  Background,
  Image,
  InlineContainer,
  ReviewContainer,
  RoundedCornerButton,
  Title,
} from '../../../styles/styles';

export default function Success() {
  const router = useRouter(); // Initialize useRouter

  const handleContinue = () => {
    router.push('/onboarding/role-selection'); // Navigate to the onboarding/general page
  };

  return (
    <Background>
      <Image src={Rose} alt="Rose" />
      <InlineContainer>
        <ReviewContainer>
          <Title>Successfully verified!</Title>
          <text>
            Your email has been verified. Please use this email address to login
            in the future.
          </text>
          <RoundedCornerButton onClick={handleContinue}>
            Continue
          </RoundedCornerButton>
        </ReviewContainer>
      </InlineContainer>
    </Background>
  );
}
