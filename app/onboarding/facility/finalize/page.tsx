'use client';

// import { useRouter } from 'next/navigation';
import { Background } from '@/app/onboarding/styles';
import Bread from '@/public/images/bread.png';
import COLORS from '@/styles/colors';
import {
  ContinueButton,
  Image,
  InlineContainer,
  ReviewContainer,
} from '@/styles/styles';
import { H3, P, SMALL } from '@/styles/text';
import { withRequireAuth } from '@/utils/AuthProvider';

function Onboarding() {
  // const router = useRouter();

  const handleContinue = () => {
    // push to application status page, will be done in next sprint
  };

  return (
    <Background isCentered={true}>
      <Image src={Bread} alt="Bread" />
      <InlineContainer>
        <ReviewContainer>
          <H3 $color={COLORS.gray12} $fontWeight="400">
            We&apos;ll be in touch!
          </H3>
          <P $fontWeight={400} $color={COLORS.gray12}>
            We&apos;ve received your application. A member of Bread & Roses will
            review it and contact you soon.
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

export default withRequireAuth(Onboarding);
