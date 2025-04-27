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
  FixedFooter,
  Image,
  InlineContainer,
  InputContainer,
  Label,
  StyledTextarea,
  Title,
} from '@/app/onboarding/styles';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import Back from '@/public/images/back.svg';
import { FacilityOnboardingContext } from '@/utils/facilityOnboardingContext';

export default function Onboarding() {
  const router = useRouter();
  const facilityOnboardingContext = useContext(FacilityOnboardingContext);

  if (!facilityOnboardingContext) {
    return null;
  }

  const { facilitySpecificInfo, setSpecificInfo } = facilityOnboardingContext;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setSpecificInfo({
      ...facilitySpecificInfo,
      [name]: value,
    });
  };

  //CHANGE CHANGE CHANGE CHANGE
  const handleSubmit = async () => {
    router.push('/onboarding/facility/final-review');
  };

  const handleBack = async () => {
    router.push('/onboarding/facility/site-info');
  };

  return (
    <Background>
      <InlineContainer>
        <BackButton onClick={handleBack}>
          <Image src={Back} alt="Back icon" />
        </BackButton>
        <Title $fontWeight={500}>We just need some final details!</Title>
        <ProgressBar from={75} to={75} />
        <Container>
          <InputContainer>
            <Label>Any notes for us at Bread & Roses?</Label>
            <StyledTextarea
              name="admin_notes"
              placeholder="There are speakers, microphones, etc."
              value={facilitySpecificInfo.admin_notes}
              onChange={handleChange}
            />
          </InputContainer>
        </Container>

        <ButtonContainer>
          <FixedFooter />
          <Button
            position="sticky"
            onClick={handleSubmit}
            disabled={
              facilitySpecificInfo.has_piano === null ||
              !facilitySpecificInfo.has_sound_equipment === null ||
              !facilitySpecificInfo.parking === null
            }
          >
            <ContinueText>Continue</ContinueText>
          </Button>
        </ButtonContainer>
      </InlineContainer>
    </Background>
  );
}
