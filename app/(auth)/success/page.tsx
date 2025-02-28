'use client';

import { useRouter } from 'next/navigation';
import Rose from '@/public/images/rose-greenbg.svg';
import COLORS from '@/styles/colors';
import { P } from '@/styles/text';
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
    //this needs to change, it should be routed to a new page that allows user to select whether they are a volunteer or facility
    router.push('/onboarding/role-selection'); // Navigate to the onboarding/general page
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
          <RoundedCornerButton onClick={handleContinue}>
            Continue
          </RoundedCornerButton>
        </ReviewContainer>
      </InlineContainer>
    </Background>
  );
}
