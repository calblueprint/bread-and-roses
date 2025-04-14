'use client';

import { useRouter } from 'next/navigation';
import { Background } from '@/app/onboarding/styles';
import Bread from '@/public/images/bread.png';
import COLORS from '@/styles/colors';
import {
  ContinueButton,
  Image,
  InlineContainer,
  ReviewContainer,
} from '@/styles/styles';
import { H3, P } from '@/styles/text';

export default function Onboarding() {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/availability/general');
  };

  return (
    <Background iscentered="true">
      <Image src={Bread} alt="Bread" />
      <InlineContainer>
        <ReviewContainer>
          <H3 $color={COLORS.gray12} $fontWeight="400">
            You&apos;re all set!
          </H3>
          <P $fontWeight={400} $color={COLORS.gray12}>
            When you want to put on a show, just fill out your availabilities
            and our producers will curate an event that matches!
          </P>
          <ContinueButton onClick={handleContinue}>
            <P $fontWeight="400" $color="white">
              Okay!
            </P>
          </ContinueButton>
        </ReviewContainer>
      </InlineContainer>
    </Background>
  );
}
