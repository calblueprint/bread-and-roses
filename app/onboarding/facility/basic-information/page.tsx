/* eslint-disable react/no-unescaped-entities */
'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import {
  BackButton,
  Background,
  Button,
  ButtonContainer,
  Container,
  ContinueText,
  Image,
  InlineContainer,
  Input,
  InputContainer,
  Label,
  Title,
} from '@/app/onboarding/styles';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import Back from '@/public/images/back.svg';
import { FacilityOnboardingContext } from '@/utils/facilityOnboardingContext';
import { formatPhoneNumber } from '@/utils/formatPhoneNumber';
import { RedAsterisk } from './styles';

export default function Onboarding() {
  const router = useRouter();
  const facilityOnboardingContext = useContext(FacilityOnboardingContext);

  if (!facilityOnboardingContext) return null;

  const { facilityGeneralInfo: generalInfo, setGeneralInfo } =
    facilityOnboardingContext;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setGeneralInfo({
      ...generalInfo,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async () => {
    const formattedPhoneNumber = formatPhoneNumber(generalInfo.phoneNumber);

    if (
      !generalInfo.firstName ||
      !generalInfo.lastName ||
      !formattedPhoneNumber
    ) {
      return;
    }

    setGeneralInfo({ ...generalInfo, phoneNumber: formattedPhoneNumber });
    router.push('/onboarding/facility/location');
  };

  const handleBack = async () => {
    router.push('/onboarding/user-role-selection');
  };

  return (
    <Background>
      <InlineContainer>
        <BackButton onClick={handleBack}>
          <Image src={Back} alt="Back icon" />
        </BackButton>
        <Title $fontWeight={500}>Can you tell us a bit about yourself?</Title>
        <ProgressBar from={0} to={33} />
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
              !/^\d{10}$/.test(generalInfo.phoneNumber.replace(/\D/g, '')) //user not allowed to continue unless a full phone number is input
            }
          >
            <ContinueText>Continue</ContinueText>
          </Button>
        </ButtonContainer>
      </InlineContainer>
    </Background>
  );
}
