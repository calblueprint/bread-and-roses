'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { submitFacilityOnboardingData } from '@/api/supabase/queries/onboarding';
import { Background } from '@/app/onboarding/styles';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import Bread from '@/public/images/bread.png';
import COLORS from '@/styles/colors';
import {
  ContinueButton,
  Image,
  InlineContainer,
  ReviewContainer,
} from '@/styles/styles';
import { H3, P, SMALL } from '@/styles/text';
import { FacilityOnboardingContext } from '@/utils/facilityOnboardingContext';

export default function Onboarding() {
  const router = useRouter();

  const context = useContext(FacilityOnboardingContext);
  if (!context) return null;
  const { facilityGeneralInfo, location } = context;

  const handleContinue = async () => {
    // push to application status page, will be done in next sprint

    // ROHIN: inserting push to availabilities + necessary back-end userRole update to test auth
    try {
      if (!facilityGeneralInfo || !location) return;
      await submitFacilityOnboardingData(facilityGeneralInfo, location);
      router.push('/availability/general');
    } catch (err) {
      console.error('[Onboarding] Facility submission failed:', err);
      // TEMPORARY error message for debugging will want to change later
      alert('Something went wrong submitting your info. Try again.');
    }
    router.push('/availability');
  };

  return (
    <ProtectedRoute allowWithoutRole>
      <Background isCentered={true}>
        <Image src={Bread} alt="Bread" />
        <InlineContainer>
          <ReviewContainer>
            <H3 $color={COLORS.gray12} $fontWeight="400">
              We&apos;ll be in touch!
            </H3>
            <P $fontWeight={400} $color={COLORS.gray12}>
              We&apos;ve received your application. A member of Bread & Roses
              will review it and contact you soon.
            </P>
            <ContinueButton onClick={handleContinue}>
              <SMALL $fontWeight="400" $color="white">
                Continue
              </SMALL>
            </ContinueButton>
          </ReviewContainer>
        </InlineContainer>
      </Background>
    </ProtectedRoute>
  );
}
