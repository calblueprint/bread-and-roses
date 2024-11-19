/* eslint-disable react/no-unescaped-entities */
'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
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
  Title,
} from '../styles';
import { Checkbox, RedAsterisk, UpdateContainer, UpdateText } from './styles';

export default function Onboarding() {
  const router = useRouter();
  const onboardingContext = useContext(OnboardingContext);
  if (!onboardingContext) return null;

  const { generalInfo, setGeneralInfo } = onboardingContext;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setGeneralInfo({
      ...generalInfo,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async () => {
    if (
      !generalInfo.firstName ||
      !generalInfo.lastName ||
      !generalInfo.phoneNumber
    ) {
      return;
    }
    router.push('/onboarding/preferences');
  };

  return (
    <Background>
      <InlineContainer>
        <Image src={Back} alt="Back icon" />
        <Container>
          <Title $fontWeight={500}>Can you tell us a bit about yourself?</Title>
          <ProgressBarContainer>
            <Rectangle variant="dark" width="25%" />
            <Rectangle variant="light" width="75%" />
          </ProgressBarContainer>
          <Label>
            First Name <RedAsterisk>*</RedAsterisk>
          </Label>
          <Input
            name="firstName"
            placeholder="Jane"
            value={generalInfo.firstName}
            onChange={handleChange}
          />
          <Label>
            Last Name <RedAsterisk>*</RedAsterisk>
          </Label>
          <Input
            name="lastName"
            placeholder="Doe"
            value={generalInfo.lastName}
            onChange={handleChange}
          />
          <Label>
            Phone Number <RedAsterisk>*</RedAsterisk>
          </Label>
          <Input
            name="phoneNumber"
            placeholder="(987) 654-3210"
            value={generalInfo.phoneNumber}
            onChange={handleChange}
          />
          <UpdateContainer>
            <Checkbox
              name="notifications"
              checked={generalInfo.notifications}
              onChange={handleChange}
            />
            <UpdateText>Notify me when an event matches my interest</UpdateText>
          </UpdateContainer>
        </Container>

        <ButtonContainer>
          <Button onClick={handleSubmit}>
            <ContinueText>Continue</ContinueText>
          </Button>
        </ButtonContainer>
      </InlineContainer>
    </Background>
  );
}
