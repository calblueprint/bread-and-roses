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
  TextArea,
  Title,
} from '@/app/onboarding/styles';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import Back from '@/public/images/back.svg';
import COLORS from '@/styles/colors';
import { P } from '@/styles/text';
import { FacilityOnboardingContext } from '@/utils/facilityOnboardingContext';
import {
  GrayInput,
  QuestionContainer,
  RadioContainer,
  RedAsterisk,
} from './styles';

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
      [name]:
        name === 'parking' || name === 'volunteer_notes'
          ? value
          : value === 'true',
    });
  };

  //CHANGE CHANGE CHANGE CHANGE
  const handleSubmit = async () => {
    router.push('/onboarding/facility/details');
  };

  const handleBack = async () => {
    router.push('/onboarding/facility/about');
  };

  return (
    <Background>
      <InlineContainer>
        <BackButton onClick={handleBack}>
          <Image src={Back} alt="Back icon" />
        </BackButton>
        <Title $fontWeight={500}>
          Can you tell us a bit about the facility?
        </Title>
        <ProgressBar from={25} to={50} />
        <Container>
          <QuestionContainer>
            <Label>
              Is there a piano? <RedAsterisk>*</RedAsterisk>
            </Label>
            <RadioContainer>
              <label>
                <GrayInput checked={facilitySpecificInfo.has_piano === true}>
                  <input
                    type="radio"
                    name="has_piano"
                    value="true"
                    onChange={handleChange}
                    checked={facilitySpecificInfo.has_piano === true}
                  />
                  <P $fontWeight={400} $color={COLORS.gray11}>
                    Yes, in working condition
                  </P>
                </GrayInput>
              </label>
              <label>
                <GrayInput checked={facilitySpecificInfo.has_piano === false}>
                  <input
                    type="radio"
                    name="has_piano"
                    value="false"
                    onChange={handleChange}
                    checked={facilitySpecificInfo.has_piano === false}
                  />
                  <P $fontWeight={400} $color={COLORS.gray11}>
                    No
                  </P>
                </GrayInput>
              </label>
            </RadioContainer>
          </QuestionContainer>

          <QuestionContainer>
            <Label>
              Is sound equipment available? <RedAsterisk>*</RedAsterisk>
            </Label>
            <RadioContainer>
              <label>
                <GrayInput
                  checked={facilitySpecificInfo.has_sound_equipment === true}
                >
                  <input
                    type="radio"
                    name="has_sound_equipment"
                    value="true"
                    onChange={handleChange}
                    checked={facilitySpecificInfo.has_sound_equipment === true}
                  />
                  <P $fontWeight={400} $color={COLORS.gray11}>
                    Yes
                  </P>
                </GrayInput>
              </label>
              <label>
                <GrayInput
                  checked={facilitySpecificInfo.has_sound_equipment === false}
                >
                  <input
                    type="radio"
                    name="has_sound_equipment"
                    value="false"
                    onChange={handleChange}
                    checked={facilitySpecificInfo.has_sound_equipment === false}
                  />
                  <P $fontWeight={400} $color={COLORS.gray11}>
                    No
                  </P>
                </GrayInput>
              </label>
            </RadioContainer>
          </QuestionContainer>

          <QuestionContainer>
            <Label>
              Is there parking available for Bread & Roses volunteers?{' '}
              <RedAsterisk>*</RedAsterisk>
            </Label>
            <RadioContainer>
              <label>
                <GrayInput
                  checked={facilitySpecificInfo.parking === 'Parking Lot'}
                >
                  <input
                    type="radio"
                    name="parking"
                    value="Parking Lot"
                    onChange={handleChange}
                    checked={facilitySpecificInfo.parking === 'Parking Lot'}
                  />
                  <P $fontWeight={400} $color={COLORS.gray11}>
                    Yes, parking lot
                  </P>
                </GrayInput>
              </label>
              <label>
                <GrayInput checked={facilitySpecificInfo.parking === 'Street'}>
                  <input
                    type="radio"
                    name="parking"
                    value="Street"
                    onChange={handleChange}
                    checked={facilitySpecificInfo.parking === 'Street'}
                  />
                  <P $fontWeight={400} $color={COLORS.gray11}>
                    Yes, street parking
                  </P>
                </GrayInput>
              </label>
              <label>
                <GrayInput checked={facilitySpecificInfo.parking === 'None'}>
                  <input
                    type="radio"
                    name="parking"
                    value="None"
                    onChange={handleChange}
                    checked={facilitySpecificInfo.parking === 'None'}
                  />
                  <P $fontWeight={400} $color={COLORS.gray11}>
                    No
                  </P>
                </GrayInput>
              </label>
            </RadioContainer>
          </QuestionContainer>

          <InputContainer>
            <Label>Notes for Volunteers</Label>
            <TextArea
              name="volunteer_notes"
              placeholder="There are speakers, microphones, etc."
              value={facilitySpecificInfo.volunteer_notes}
              onChange={handleChange}
              rows={4}
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
