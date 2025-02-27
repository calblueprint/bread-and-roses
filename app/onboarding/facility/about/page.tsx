/* eslint-disable react/no-unescaped-entities */
'use client';

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCurrentUserFacility } from '@/api/supabase/queries/onboarding';
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
import InputDropdown from '@/components/InputDropdown/InputDropdown';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import Back from '@/public/images/back.svg';
import COLORS from '@/styles/colors';
import { P } from '@/styles/text';
import { FacilityOnboardingContext } from '@/utils/facilityOnboardingContext';
import { GrayInput, RedAsterisk } from './styles';

const facilityTypeOptions = new Set([
  'Assisted Living',
  "Children's Day Care",
  'Detention Center',
  'Developmentally Disabled',
  'Food Bank',
  'Homeless Services',
  'Hospital',
  'Mental Health Services',
  'Recovery Center',
  'Senior Day Program',
  'Skilled Nursing Care',
  'Special Needs School',
  'Visually Impaired',
]);

const audienceTypeOptions = new Set(['Youth', 'Adult', 'Senior']);

export default function Onboarding() {
  const router = useRouter();
  const facilityOnboardingContext = useContext(FacilityOnboardingContext);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!facilityOnboardingContext) return;

    const { location, setLocation } = facilityOnboardingContext;

    if (!location.address) {
      // Only fetch if address isn't set
      async function fetchLocation() {
        try {
          const loc = await fetchCurrentUserFacility();
          if (loc) {
            setLocation({
              address: loc.street_address_1,
              city: loc.city,
              county: loc.county || '',
              zipCode: loc.zip,
            });
          }
        } catch (error) {
          console.error('Error fetching facility:', error);
        } finally {
          setLoading(false);
        }
      }
      fetchLocation();
    } else {
      setLoading(false);
    }
  }, [facilityOnboardingContext]);

  if (!facilityOnboardingContext) return null;

  if (loading) {
    return <p>Loading...</p>;
  }

  const { facilityGeneralInfo: generalInfo, setGeneralInfo } =
    facilityOnboardingContext;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGeneralInfo({
      ...generalInfo,
      [name]: value,
    });
  };

  const handleFacilityChange = (selectedOption: string | null) => {
    if (selectedOption) {
      setGeneralInfo({ ...generalInfo, facilityType: selectedOption });
    }
  };

  const handleAudienceChange = (selectedOptions: Set<string>) => {
    const selectedArray = Array.from(selectedOptions);
    setGeneralInfo({ ...generalInfo, audience: selectedArray });
  };

  //CHANGE CHANGE CHANGE CHANGE
  const handleSubmit = async () => {
    router.push('/onboarding/facility/site-info');
  };

  const handleBack = async () => {
    router.push('/onboarding/facility/status');
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
        <ProgressBar from={0} to={25} />
        <Container>
          <InputContainer>
            <Label>
              Name of Facility <RedAsterisk>*</RedAsterisk>
            </Label>
            <Input
              name="facilityName"
              placeholder="Highland Hospital"
              value={generalInfo.facilityName}
              onChange={handleChange}
            />
          </InputContainer>

          <InputContainer>
            <Label>
              Facility Address <RedAsterisk>*</RedAsterisk>
            </Label>
            <GrayInput>
              {facilityOnboardingContext.location.address},{' '}
              {facilityOnboardingContext.location.city}, CA,{' '}
              {facilityOnboardingContext.location.zipCode}
            </GrayInput>
            <P $fontWeight={400} $color={COLORS.gray10}>
              (Street, City, State, Zip)
            </P>
          </InputContainer>

          <InputDropdown
            label="Type of Facility"
            placeholder="Type to filter"
            multi={false}
            onChange={handleFacilityChange}
            options={facilityTypeOptions}
            value={generalInfo.facilityType}
            required={true}
          />

          <InputDropdown
            label="Audience"
            placeholder="Type to filter"
            multi
            onChange={handleAudienceChange}
            options={audienceTypeOptions}
            value={new Set(generalInfo.audience)}
            required={true}
          />

          <InputContainer>
            <Label>
              Directions to Facility <RedAsterisk>*</RedAsterisk>
            </Label>
            <Input
              name="directions"
              placeholder="e.g., Take 101 to Durant Ave..."
              value={generalInfo.directions}
              onChange={handleChange}
            />
          </InputContainer>

          <InputContainer>
            <Label>
              Facility Capacity <RedAsterisk>*</RedAsterisk>
            </Label>
            <Input
              name="capacity"
              placeholder="e.g., 65 participants"
              value={generalInfo.capacity}
              onChange={handleChange}
            />
          </InputContainer>
        </Container>

        <ButtonContainer>
          <Button
            position="sticky"
            onClick={handleSubmit}
            disabled={
              !generalInfo.facilityName ||
              !generalInfo.facilityType ||
              generalInfo.audience.length === 0 ||
              generalInfo.directions === '' ||
              generalInfo.capacity === ''
            }
          >
            <ContinueText>Continue</ContinueText>
          </Button>
        </ButtonContainer>
      </InlineContainer>
    </Background>
  );
}
