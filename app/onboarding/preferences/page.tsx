'use client';

import { useContext } from 'react';
import Link from 'next/link';
import Back from '@/public/images/back.svg';
import { OnboardingContext } from '@/utils/onboardingContext';
import {
  Background,
  Button,
  ButtonContainer,
  Container,
  ContinueText,
  Image,
  InlineContainer,
  Input,
  Label,
  ProgressBarContainer,
  Rectangle,
  StyledLink,
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
        <Container>
          <Title $fontWeight={500}>Help us tailor shows to you!</Title>
          <ProgressBarContainer>
            <Rectangle variant="dark" width="50%" />
            <Rectangle variant="light" width="50%" />
          </ProgressBarContainer>
          <Label>Facility Type</Label>
          <Input
            name="facilityType"
            value={preferences.facilityType}
            onChange={handleChange}
          />
          <Label>Location Preferences</Label>
          <Input
            name="location"
            value={preferences.location}
            onChange={handleChange}
          />
          <Label>Preferred Audience</Label>
          <Input
            name="audience"
            value={preferences.audience}
            onChange={handleChange}
          />
          <Label>Type of Performance</Label>
          <Input
            name="typeOfAct"
            value={preferences.typeOfAct}
            onChange={handleChange}
          />
          <Label>Performance Genre</Label>
          <Input
            name="genre"
            value={preferences.genre}
            onChange={handleChange}
          />
          <Label>Performance Grouping</Label>
          <Input
            name="performance grouping"
            value={preferences.preferredEquipment}
            onChange={handleChange}
          />
        </Container>
        <StyledLink href="/onboarding/review">
          <ButtonContainer>
            <Button>
              <ContinueText>Continue</ContinueText>
            </Button>
          </ButtonContainer>
        </StyledLink>
      </InlineContainer>
    </Background>
  );
}
