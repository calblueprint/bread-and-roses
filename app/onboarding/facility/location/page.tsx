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
  Input,
  InputContainer,
  Label,
  RowContainer,
  Title,
} from '@/app/onboarding/styles';
import InputDropdown from '@/components/InputDropdown/InputDropdown';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import Back from '@/public/images/back.svg';
import { FacilityOnboardingContext } from '@/utils/facilityOnboardingContext';
import { RedAsterisk } from './styles';

export default function Onboarding() {
  const router = useRouter();
  const facilityOnboardingContext = useContext(FacilityOnboardingContext);

  if (!facilityOnboardingContext) return null;

  const { location, setLocation } = facilityOnboardingContext;
  const { facilityGeneralInfo, setGeneralInfo } = facilityOnboardingContext;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocation({
      ...location,
      [name]: value,
    });
    setGeneralInfo({
      ...facilityGeneralInfo,
      [name]: value,
    });
  };

  const handleDropdownChange = (
    field: 'has_host' | 'changing_facility_contact',
    value: string | null,
  ) => {
    setGeneralInfo({
      ...facilityGeneralInfo,
      [field]: value === 'Yes',
    });
  };

  const handleSubmit = async () => {
    if (
      !location.address ||
      !location.city ||
      !location.county ||
      !location.zipCode ||
      !facilityGeneralInfo.facilityName
    ) {
      return;
    }
    router.push('/onboarding/facility/review');
  };

  const handleBack = () => {
    router.push('/onboarding/facility/basic-information');
  };

  return (
    <Background>
      <InlineContainer>
        <BackButton onClick={handleBack}>
          <Image src={Back} alt="Back icon" />
        </BackButton>
        <Title $fontWeight={500}>Where is the facility located?</Title>
        <ProgressBar from={33} to={66} />
        <Container>
          <InputContainer>
            <Label>
              Facility Name <RedAsterisk>*</RedAsterisk>
            </Label>
            <Input
              name="facilityName"
              placeholder="Highland Hospital"
              value={facilityGeneralInfo.facilityName}
              onChange={handleChange}
            />
          </InputContainer>

          <InputContainer>
            <Label>
              Street Address <RedAsterisk>*</RedAsterisk>
            </Label>
            <Input
              name="address"
              placeholder="1411 E 31st Street"
              value={location.address}
              onChange={handleChange}
            />
          </InputContainer>

          <RowContainer>
            <InputContainer>
              <Label>
                City <RedAsterisk>*</RedAsterisk>
              </Label>
              <Input
                name="city"
                placeholder="Oakland"
                value={location.city}
                onChange={handleChange}
              />
            </InputContainer>

            <InputContainer>
              <Label>
                County <RedAsterisk>*</RedAsterisk>
              </Label>
              <Input
                name="county"
                placeholder="Alameda"
                value={location.county}
                onChange={handleChange}
              />
            </InputContainer>
          </RowContainer>

          <InputContainer>
            <Label>
              Zip Code <RedAsterisk>*</RedAsterisk>
            </Label>
            <Input
              name="zipCode"
              placeholder="94602"
              value={location.zipCode}
              onChange={handleChange}
            />
          </InputContainer>

          <InputDropdown
            label="Does this facility have a host?"
            placeholder="No"
            multi={false}
            onChange={value => handleDropdownChange('has_host', value)}
            options={new Set(['Yes', 'No'])}
            value={
              facilityGeneralInfo.has_host === true
                ? 'Yes'
                : facilityGeneralInfo.has_host === false
                  ? 'No'
                  : null
            }
            required={true}
          />

          <InputDropdown
            label="Has this facility signed up before? (Changing the facility contact?)"
            placeholder="No"
            multi={false}
            onChange={value =>
              handleDropdownChange('changing_facility_contact', value)
            }
            options={new Set(['Yes', 'No'])}
            value={
              facilityGeneralInfo.changing_facility_contact === true
                ? 'Yes'
                : facilityGeneralInfo.changing_facility_contact === false
                  ? 'No'
                  : null
            }
            required={true}
          />
        </Container>

        <ButtonContainer>
          <FixedFooter />
          <Button
            position="sticky"
            onClick={handleSubmit}
            disabled={
              !location.address ||
              !location.city ||
              !location.county ||
              !location.zipCode ||
              facilityGeneralInfo.has_host === null ||
              facilityGeneralInfo.changing_facility_contact === null
            }
          >
            <ContinueText>Continue</ContinueText>
          </Button>
        </ButtonContainer>
      </InlineContainer>
    </Background>
  );
}
