'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { submitOnboardingData } from '@/api/supabase/queries/onboarding';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import Back from '@/public/images/back.svg';
import { SMALL } from '@/styles/text';
import { OnboardingContext } from '@/utils/onboardingContext';
import {
  Background,
  Image,
  InlineContainer,
  Label,
  StyledLink,
  SubmitButton,
  Title,
} from '../styles';
import { BackButton, Line, ReviewContainer, SmallText } from './styles';

export default function Review() {
  const router = useRouter();

  const onboardingContext = useContext(OnboardingContext);

  if (!onboardingContext) return null;

  const { role } = onboardingContext;
  const { preferences, generalInfo } = onboardingContext;

  const displayValue = (value: string | string[] | undefined): string => {
    if (Array.isArray(value)) {
      return value.length > 0 ? value.join(', ') : 'N/A';
    }
    return value || 'N/A';
  };

  const handleBack = () => {
    router.push('/onboarding/additional-info');
  };

  const submitData = async () => {
    if (!generalInfo || !preferences) return;
    await submitOnboardingData(generalInfo, preferences, role);
  };

  return (
    <Background>
      <InlineContainer>
        <BackButton onClick={handleBack}>
          <Image src={Back} alt="Back icon" />
        </BackButton>
        <Title $fontWeight={500}>Did we get everything?</Title>
        {role.isPerformer ? (
          <ProgressBar from={80} to={100} />
        ) : (
          <ProgressBar from={75} to={100} />
        )}
        <ReviewContainer>
          <Label>First Name</Label>
          <SmallText>{displayValue(generalInfo.firstName)}</SmallText>
          <Label>Last Name</Label>
          <SmallText>{displayValue(generalInfo.lastName)}</SmallText>
          <Label>Phone Number</Label>
          <SmallText>{displayValue(generalInfo.phoneNumber)}</SmallText>

          <Line />

          <Label>Facility Type</Label>
          <SmallText>{displayValue(preferences.facilityType)}</SmallText>
          <Label>Preferred Location</Label>
          <SmallText>{displayValue(preferences.location)}</SmallText>
          <Label>Audience</Label>
          <SmallText>{displayValue(preferences.audience)}</SmallText>

          <Line />

          <Label>Performance Type</Label>
          <SmallText>{displayValue(preferences.performanceType)}</SmallText>
          <Label>Genre</Label>
          <SmallText>{displayValue(preferences.genre)}</SmallText>
          <Label>Group Size</Label>
          <SmallText>{displayValue(preferences.performerType)}</SmallText>

          <Line />

          <Label>Additional Information</Label>
          <SmallText>{displayValue(preferences.additionalInfo)}</SmallText>
        </ReviewContainer>

        <StyledLink href="/onboarding/finalize">
          <SubmitButton onClick={submitData}>
            <SMALL $fontWeight="400" $color="white">
              Everything looks good!
            </SMALL>
          </SubmitButton>
        </StyledLink>
      </InlineContainer>
    </Background>
  );
}
