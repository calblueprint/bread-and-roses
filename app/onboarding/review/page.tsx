'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { submitOnboardingData } from '@/api/supabase/queries/onboarding';
import Back from '@/public/images/back.svg';
import { SMALL } from '@/styles/text';
import { OnboardingContext } from '@/utils/onboardingContext';
import {
  Background,
  Button,
  InlineContainer,
  Label,
  ProgressBarContainer,
  Rectangle,
  StyledLink,
  Title,
} from '../styles';
import { Image, Line, ReviewContainer, SmallText } from './styles';

export default function Review() {
  const onboardingContext = useContext(OnboardingContext);

  if (!onboardingContext) return null;

  const { preferences, generalInfo } = onboardingContext;

  const submitData = async () => {
    if (!generalInfo || !preferences) return;
    await submitOnboardingData(generalInfo, preferences);
  };

  return (
    <Background>
      <InlineContainer>
        <Link href="/onboarding/preferences">
          <Image src={Back} alt="Back icon" />
        </Link>

        <ReviewContainer>
          <Title $fontWeight={500}>Did we get everything?</Title>
          <ProgressBarContainer>
            <Rectangle variant="dark" width="100%" />
          </ProgressBarContainer>
          <Label>First Name</Label>
          <SmallText>{generalInfo.firstName}</SmallText>
          <Label>Last Name</Label>
          <SmallText>{generalInfo.lastName}</SmallText>
          <Label>Phone Number</Label>
          <SmallText>{generalInfo.phoneNumber}</SmallText>

          <Line />

          <Label>Facility Type</Label>
          <SmallText>{preferences.facilityType}</SmallText>
          <Label>Preferred Location</Label>
          <SmallText>{preferences.location}</SmallText>
          <Label>Audience</Label>
          <SmallText>{preferences.audience}</SmallText>
          <Label>Preferred Equipment</Label>
          <SmallText>{preferences.preferredEquipment}</SmallText>
          <Label>Type of Act</Label>
          <SmallText>{preferences.typeOfAct}</SmallText>
          <Label>Genre</Label>
          <SmallText>{preferences.genre}</SmallText>

          <StyledLink href="/onboarding/yay">
            <Button onClick={submitData}>
              <SMALL $fontWeight="400" $color="white">
                Everything looks good!
              </SMALL>
            </Button>
          </StyledLink>
        </ReviewContainer>
      </InlineContainer>
    </Background>
  );
}
