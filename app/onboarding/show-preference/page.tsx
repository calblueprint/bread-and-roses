'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import InputDropdown from '@/components/InputDropdown/InputDropdown';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import Back from '@/public/images/back.svg';
import { OnboardingContext } from '@/utils/onboardingContext';
import {
  BackButton,
  Background,
  Button,
  ButtonContainer,
  Container,
  ContinueText,
  Image,
  InlineContainer,
  SkipButton,
  SkipText,
  Title,
} from '../styles';

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

const locationOptions = new Set([
  'Alameda',
  'Contra Coast',
  'Marin',
  'Napa',
  'San Fransisco',
  'San Mateo',
  'Santa Clara',
  'Solano',
  'Sonoma',
]);

const audienceOptions = new Set(['Youth', 'Adults', 'Senior ']);

export default function Onboarding() {
  const router = useRouter();
  const onboardingContext = useContext(OnboardingContext);

  if (!onboardingContext) return null;

  const { role } = onboardingContext;
  const { preferences, setPreferences } = onboardingContext;

  const handleFacilityChange = (selectedOptions: Set<string>) => {
    const selectedArray = Array.from(selectedOptions);
    setPreferences({ ...preferences, facilityType: selectedArray });
  };

  const handleLocationChange = (selectedOptions: Set<string>) => {
    const selectedArray = Array.from(selectedOptions);
    setPreferences({ ...preferences, location: selectedArray });
  };

  const handleAudienceChange = (selectedOptions: Set<string>) => {
    const selectedArray = Array.from(selectedOptions);
    setPreferences({ ...preferences, audience: selectedArray });
  };

  const handleSubmit = async () => {
    if (role.isPerformer) {
      router.push('/onboarding/performance');
    } else {
      router.push('/onboarding/additional-info');
    }
  };

  const handleBack = () => {
    router.push('/onboarding/basic-information');
  };

  return (
    <Background>
      <InlineContainer>
        <BackButton onClick={handleBack}>
          <Image src={Back} alt="Back icon" />
        </BackButton>
        <Title $fontWeight={500}>
          Do you have any show
          <br />
          preferences?
        </Title>
        <ProgressBar progress={40} />
        <Container>
          <InputDropdown
            label="Facility Types"
            placeholder="Type to filter"
            multi
            onChange={handleFacilityChange}
            options={facilityTypeOptions}
            value={new Set(preferences.facilityType)}
          />
          <InputDropdown
            label="Location Preferences"
            placeholder="Type to filter"
            multi
            onChange={handleLocationChange}
            options={locationOptions}
            value={new Set(preferences.location)}
          />
          <InputDropdown
            label="Preferred Audience"
            placeholder="Type to filter"
            multi
            onChange={handleAudienceChange}
            options={audienceOptions}
            value={new Set(preferences.audience)}
          />
        </Container>

        <ButtonContainer>
          <SkipButton onClick={handleSubmit}>
            <SkipText>skip</SkipText>
          </SkipButton>
          <Button onClick={handleSubmit} position="fixed">
            <ContinueText>Continue</ContinueText>
          </Button>
        </ButtonContainer>
      </InlineContainer>
    </Background>
  );
}
