'use client';

import { useRouter } from 'next/navigation';
import Rose from '@/public/images/rose.svg';
import COLORS from '@/styles/colors';
import {
  ContinueButton,
  Image,
  InlineContainer,
  ReviewContainer,
} from '@/styles/styles';
import { H5, P } from '@/styles/text';
import { Background } from '../../styles';

export default function Onboarding() {
  const router = useRouter(); // Initialize useRouter

  const handleContinue = () => {
    router.push('/discover'); // Navigate to the Discover page
  };

  return (
    <Background iscentered="true">
      <Image src={Rose} alt="Rose" />
      <InlineContainer>
        <ReviewContainer>
          <H5 $color={COLORS.gray12} $fontWeight="500">
            You&apos;re all set!
          </H5>
          <P $fontWeight={400} $color={COLORS.gray12}>
            We recommend checking out some upcoming events in the Discover page.
            If you&apos;re interested in participating, please sign up!
          </P>
          <ContinueButton onClick={handleContinue}>
            <P $fontWeight="400" $color="white">
              Continue
            </P>
          </ContinueButton>
        </ReviewContainer>
      </InlineContainer>
    </Background>
  );
}
