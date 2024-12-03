'use client';

import { useRouter } from 'next/navigation';
import Rose from '@/public/images/rose.svg';
import { SMALL } from '@/styles/text';
import { Background } from '../styles';
import {
  ContinueButton,
  Image,
  InlineContainer,
  ReviewContainer,
  Title,
} from './styles';

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
          <Title>You&apos;re all set!</Title>
          <text>
            We recommend checking out some upcoming events in the Discover page.
            If you&apos;re interested in participating, please sign up!
          </text>
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
