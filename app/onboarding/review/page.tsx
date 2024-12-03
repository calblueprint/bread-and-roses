'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { submitOnboardingData } from '@/api/supabase/queries/onboarding';
import Back from '@/public/images/back.svg';
import { SMALL } from '@/styles/text';
import { OnboardingContext } from '@/utils/onboardingContext';
import {
  Background,
  Button,
  Image,
  InlineContainer,
  Label,
  ProgressBarContainer,
  Rectangle,
  StyledLink,
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

  const handleBack = async () => {
    if (role.isPerformer) {
      router.push('/onboarding/performer');
    } else {
      router.push('/onboarding/show');
    }
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
        <ProgressBarContainer>
          <Rectangle variant="dark" width="100%" />
        </ProgressBarContainer>
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
          <Label>Type of Act</Label>
          <SmallText>{displayValue(preferences.typeOfAct)}</SmallText>
          <Label>Genre</Label>
          <SmallText>{displayValue(preferences.genre)}</SmallText>
        </ReviewContainer>

        <StyledLink href="/onboarding/finalize">
          <Button onClick={submitData}>
            <SMALL $fontWeight="400" $color="white">
              Everything looks good!
            </SMALL>
          </Button>
        </StyledLink>
      </InlineContainer>
    </Background>
  );
}
