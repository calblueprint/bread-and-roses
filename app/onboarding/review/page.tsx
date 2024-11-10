'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { submitOnboardingData } from '@/api/supabase/queries/onboarding';
import Back from '@/public/images/back.svg';
import { SMALL } from '@/styles/text';
import { OnboardingContext } from '@/utils/onboardingContext';
import { Background, InlineContainer, Rectangle, StyledLink } from '../styles';
import {
  ConfirmButton,
  Image,
  Line,
  ReviewContainer,
  SmallText,
  Title,
} from './styles';

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
        <div>
          <Rectangle variant="dark" widthPercentage="100%" />
        </div>

        <Link href="/onboarding/preferences">
          <Image src={Back} alt="Back icon" />
        </Link>

        <ReviewContainer>
          <Title>Did we get everything?</Title>
          <text>First Name</text>
          <SmallText>{generalInfo.firstName}</SmallText>
          <text>Last Name</text>
          <SmallText>{generalInfo.lastName}</SmallText>
          <text>Phone Number</text>
          <SmallText>{generalInfo.phoneNumber}</SmallText>

          <Line />

          <text>Facility Type</text>
          <SmallText>{preferences.facilityType}</SmallText>
          <text>Preferred Location</text>
          <SmallText>{preferences.location}</SmallText>
          <text>Audience</text>
          <SmallText>{preferences.audience}</SmallText>
          <text>Preferred Equipment</text>
          <SmallText>{preferences.preferredEquipment}</SmallText>
          <text>Type of Act</text>
          <SmallText>{preferences.typeOfAct}</SmallText>
          <text>Genre</text>
          <SmallText>{preferences.genre}</SmallText>

          <StyledLink href="/onboarding/yay">
            <ConfirmButton onClick={submitData}>
              <SMALL $fontWeight="400" $color="white">
                Confirm
              </SMALL>
            </ConfirmButton>
          </StyledLink>
        </ReviewContainer>
      </InlineContainer>
    </Background>
  );
}
