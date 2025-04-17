/* eslint-disable react/no-unescaped-entities */
'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import Back from '@/public/images/back.svg';
import { formatPhoneNumber } from '@/utils/formatPhoneNumber';
import { OnboardingContext } from '@/utils/onboardingContext';
import {
  BackButton,
  Background,
  Button,
  ButtonContainer,
  Checkbox,
  Container,
  ContinueText,
  FixedFooter,
  Image,
  InlineContainer,
  Input,
  InputContainer,
  InputNote,
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
    const formattedPhoneNumber = formatPhoneNumber(generalInfo.phoneNumber);
    if (
      !generalInfo.firstName ||
      !generalInfo.lastName ||
      !formattedPhoneNumber
    ) {
      return;
    }

    setGeneralInfo({ ...generalInfo, phoneNumber: formattedPhoneNumber });
    router.push('/onboarding/show-preference');
  };

  const handleBack = () => {
    router.push('/onboarding/role-selection');
  };

  return (
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
            <div>
              <Label>
                Phone Number <RedAsterisk>*</RedAsterisk>
              </Label>
              <InputNote>Please enter a valid 10 digit phone number.</InputNote>
            </div>
            <Input
              name="phoneNumber"
              placeholder="(987) 654-3210"
              value={generalInfo.phoneNumber}
              onChange={handleChange}
            />
          </InputContainer>

          <InputContainer>
            <Label>Social Media</Label>
            <Input
              name="socialMedia"
              placeholder="Instagram: @janedoe"
              value={generalInfo.socialMedia}
              onChange={handleChange}
            />
          </InputContainer>

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
          <FixedFooter />
          <Button
            position="sticky"
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
