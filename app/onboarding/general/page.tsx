/* eslint-disable react/no-unescaped-entities */
'use client';

import { useContext } from 'react';
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
  StyledLink,
  Title,
} from '../styles';
import { Checkbox, RedAsterisk, UpdateContainer, UpdateText } from './styles';

export default function Onboarding() {
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

  return (
    <Background>
      <InlineContainer>
        <Image src={Back} alt="Back icon" />
        <div>
          <Rectangle variant="light" widthPercentage="25%" />
          <Rectangle variant="dark" widthPercentage="75%" />
        </div>
        <Container>
          <Title>Tell us a bit about yourself!</Title>
          <text>
            {' '}
            First Name <RedAsterisk>*</RedAsterisk>{' '}
          </text>
          <Input
            name="firstName"
            value={generalInfo.firstName}
            onChange={handleChange}
          />
          <text>
            {' '}
            Last Name <RedAsterisk>*</RedAsterisk>{' '}
          </text>
          <Input
            name="lastName"
            value={generalInfo.lastName}
            onChange={handleChange}
          />
          <text>
            {' '}
            Phone Number <RedAsterisk>*</RedAsterisk>{' '}
          </text>
          <Input
            name="phoneNumber"
            value={generalInfo.phoneNumber}
            onChange={handleChange}
          />
          <UpdateContainer>
            <Checkbox
              type="checkbox"
              name="notifications"
              checked={generalInfo.notifications}
              onChange={handleChange}
            />
            <UpdateText>
              I want to get updated when there's an event that matches my
              interest!
            </UpdateText>
          </UpdateContainer>
        </Container>

        <StyledLink href="/onboarding/preferences">
          <ButtonContainer>
            <ContinueButton>
              <ContinueText>Continue</ContinueText>
            </ContinueButton>
          </ButtonContainer>
        </StyledLink>
      </InlineContainer>
    </Background>
  );
}
