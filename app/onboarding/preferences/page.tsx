'use client';

import { useContext } from 'react';
import Link from 'next/link';
import Back from '@/public/images/back.svg';
import { OnboardingContext } from '@/utils/onboardingContext';
import {
  Background,
  ButtonContainer,
  Container,
  ContinueButton,
  ContinueText,
  Image,
  InlineContainer,
  Input,
  Rectangle,
  Title,
} from '../styles';

export default function Onboarding() {
  const onboardingContext = useContext(OnboardingContext);

  if (!onboardingContext) return null;

  const { preferences, setPreferences } = onboardingContext;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value });
  };

  return (
    <Background>
      <InlineContainer>
        <Link href="/onboarding/general">
          <Image src={Back} alt="Back icon" />
        </Link>

        <div>
          <Rectangle variant="light" widthPercentage="50%" />
          <Rectangle variant="dark" widthPercentage="50%" />
        </div>
        <Container>
          <Title>Help us tailor shows to you!</Title>
          <text>Facility Type</text>
          <Input
            name="facilityType"
            value={preferences.facilityType}
            onChange={handleChange}
          />
          <text>Preferred Location</text>
          <Input
            name="location"
            value={preferences.location}
            onChange={handleChange}
          />
          <text>Audience</text>
          <Input
            name="audience"
            value={preferences.audience}
            onChange={handleChange}
          />
          <text>Preferred Equipment</text>
          <Input
            name="preferredEquipment"
            value={preferences.preferredEquipment}
            onChange={handleChange}
          />
          <text>Type of Act</text>
          <Input
            name="typeOfAct"
            value={preferences.typeOfAct}
            onChange={handleChange}
          />
          <text>Genre</text>
          <Input
            name="genre"
            value={preferences.genre}
            onChange={handleChange}
          />
        </Container>
        <ButtonContainer>
          <ContinueButton>
            <ContinueText>Continue</ContinueText>
          </ContinueButton>
        </ButtonContainer>
      </InlineContainer>
    </Background>
  );
}
