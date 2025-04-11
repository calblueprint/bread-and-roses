/* eslint-disable react/no-unescaped-entities */
'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import Back from '@/public/images/back.svg';
import { OnboardingContext } from '@/utils/onboardingContext';
import {
  BackButton,
  Background,
  Button,
  ButtonContainer,
  Checkbox,
  Container,
  ContinueText,
  Image,
  InlineContainer,
  Input,
  InputContainer,
  Label,
  Title,
} from '../styles';
import { RedAsterisk, UpdateContainer, UpdateText } from './styles';

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
    router.push('/onboarding/show-preference');
  };

  const handleBack = () => {
    router.push('/onboarding/role-selection');
  };

  return (
    <ProtectedRoute allowWithoutRole>
      <Background>
        <InlineContainer>
          <BackButton onClick={handleBack}>
            <Image src={Back} alt="Back icon" />
          </BackButton>
          <Title $fontWeight={500}>Can you tell us a bit about yourself?</Title>
          <ProgressBar from={0} to={20} />
          <Container>
            <InputContainer>
              <Label>
                First Name <RedAsterisk>*</RedAsterisk>
              </Label>
              <Input
                name="firstName"
                placeholder="Jane"
                value={generalInfo.firstName}
                onChange={handleChange}
              />
            </InputContainer>

            <InputContainer>
              <Label>
                Last Name <RedAsterisk>*</RedAsterisk>
              </Label>
              <Input
                name="lastName"
                placeholder="Doe"
                value={generalInfo.lastName}
                onChange={handleChange}
              />
            </InputContainer>

            <InputContainer>
              <Label>
                Phone Number <RedAsterisk>*</RedAsterisk>
              </Label>
              <Input
                name="phoneNumber"
                placeholder="(987) 654-3210"
                value={generalInfo.phoneNumber}
                onChange={handleChange}
              />
            </InputContainer>
            <UpdateContainer>
              <Checkbox
                name="notifications"
                checked={generalInfo.notifications}
                onChange={handleChange}
              />
              <UpdateText>
                Notify me when an event matches my interest
              </UpdateText>
            </UpdateContainer>
          </Container>

          <ButtonContainer>
            <Button
              position="fixed"
              onClick={handleSubmit}
              disabled={
                !generalInfo.firstName ||
                !generalInfo.lastName ||
                !generalInfo.phoneNumber
              }
            >
              <ContinueText>Continue</ContinueText>
            </Button>
          </ButtonContainer>
        </InlineContainer>
      </Background>
    </ProtectedRoute>
  );
}
