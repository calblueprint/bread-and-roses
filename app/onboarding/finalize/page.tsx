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
import { H3, P, SMALL } from '@/styles/text';
import { Background } from '../styles';

export default function Onboarding() {
  const router = useRouter(); // Initialize useRouter

  const handleContinue = () => {
    router.push('/discover'); // Navigate to the Discover page
  };

  return (
    <Background isCentered={true}>
      <Image src={Rose} alt="Rose" />
      <InlineContainer>
        <ReviewContainer>
          <H3 $color={COLORS.gray12} $fontWeight="400">
            You&apos;re all set!
          </H3>
          <P $fontWeight={400} $color={COLORS.gray12}>
            We recommend checking out some upcoming events in the Discover page.
            If you&apos;re interested in participating, please sign up!
          </P>
          </P>
          <ContinueButton onClick={handleContinue}>
            <SMALL $fontWeight="400" $color="white">
              Continue
            </SMALL>
          </ContinueButton>
        </ReviewContainer>
      </InlineContainer>
    </Background>
  );
}
