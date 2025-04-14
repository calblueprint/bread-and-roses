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
import { H5, P } from '@/styles/text';

export default function Onboarding() {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/onboarding/facility/status');
  };

  return (
    <Background iscentered="true">
      <Image src={Bread} alt="Bread" />
      <InlineContainer>
        <ReviewContainer>
          <H5 $color={COLORS.gray12} $fontWeight="500">
            We&apos;ll be in touch!
          </H5>
          <P $fontWeight={400} $color={COLORS.gray12}>
            We&apos;ve received your application. A member of Bread & Roses will
            review it and contact you soon.
          </P>
          <ContinueButton onClick={handleContinue}>
            <P $fontWeight="400" $color="white">
              Sounds Good
            </P>
          </ContinueButton>
        </ReviewContainer>
      </InlineContainer>
    </Background>
  );
}
