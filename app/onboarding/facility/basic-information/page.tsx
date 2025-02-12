/* eslint-disable react/no-unescaped-entities */
'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import {
  Background,
  Button,
  ButtonContainer,
  Container,
  ContinueText,
  InlineContainer,
  Input,
  InputContainer,
  Label,
  Title,
} from '@/app/onboarding/styles';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import { FacilityOnboardingContext } from '@/utils/facilityOnboardingContext';
import { RedAsterisk } from './styles';

export default function Onboarding() {
  const router = useRouter();
  const facilityOnboardingContext = useContext(FacilityOnboardingContext);

  if (!facilityOnboardingContext) return null;

  const { generalInfo, setGeneralInfo } = facilityOnboardingContext;

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
    router.push('/onboarding/facility/show-preference');
  };

  return (
    <Background>
      <InlineContainer>
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
  );
}
