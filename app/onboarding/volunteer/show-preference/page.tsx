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
  FixedFooter,
  Image,
  InlineContainer,
  SkipButton,
  SkipText,
  Title,
} from '../../styles';

const facilityTypeOptions = new Set([
  'Select All',
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
  'Select All',
  'Alameda',
  'Contra Costa',
  'Marin',
  'Napa',
  'San Francisco',
  'San Mateo',
  'Santa Clara',
  'Sonoma',
]);

const audienceOptions = new Set(['Select All', 'Youth', 'Adults', 'Senior']);

type PreferencesType = {
  facilityType: string[];
  location: string[];
  audience: string[];
};

export default function Onboarding() {
  const router = useRouter();
  const onboardingContext = useContext(OnboardingContext);

  if (!onboardingContext) return null;

  const { role } = onboardingContext;
  const { preferences, setPreferences } = onboardingContext;

  let progress = 0;
  // number of steps in each onboarding
  if (role.isHost && role.isPerformer) {
    progress = (2 * 100) / 7;
  } else if (role.isHost) {
    progress = (2 * 100) / 5;
  } else {
    progress = (2 * 100) / 6;
  }

  const handleSelectionChange = (
    selectedOptions: Set<string>,
    optionsSet: Set<string>,
    key: keyof PreferencesType,
  ) => {
    const realOptions = Array.from(optionsSet).filter(
      option => option !== 'Select All',
    );

    let updatedOptions = new Set(selectedOptions);

    if (selectedOptions.has('Select All')) {
      const isAllSelected = realOptions.every(option =>
        selectedOptions.has(option),
      );

      if (isAllSelected) {
        // If everything is already selected, clicking "Select All" should unselect everything
        updatedOptions.clear();
      } else {
        // Otherwise, select all real options
        updatedOptions = new Set(realOptions);
      }
    } else {
      const isAllSelected = realOptions.every(option =>
        selectedOptions.has(option),
      );
      if (isAllSelected) {
        updatedOptions.add('Select All');
      } else {
        updatedOptions.delete('Select All');
      }
    }

    setPreferences({ ...preferences, [key]: Array.from(updatedOptions) });
  };

  const handleFacilityChange = (selectedOptions: Set<string>) =>
    handleSelectionChange(selectedOptions, facilityTypeOptions, 'facilityType');

  const handleLocationChange = (selectedOptions: Set<string>) =>
    handleSelectionChange(selectedOptions, locationOptions, 'location');

  const handleAudienceChange = (selectedOptions: Set<string>) =>
    handleSelectionChange(selectedOptions, audienceOptions, 'audience');

  const handleSubmit = async () => {
    if (role.isPerformer) {
      router.push('/onboarding/volunteer/performance');
    } else if (role.isHost) {
      router.push('/onboarding/volunteer/host-show-preference');
    }
  };

  const handleBack = () => {
    router.push('/onboarding/volunteer/basic-information');
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
        <ProgressBar from={progress} to={progress} />
        <Container>
          <InputDropdown
            label="Facility Types"
            placeholder="Type to filter..."
            multi
            onChange={handleFacilityChange}
            options={facilityTypeOptions}
            value={new Set(preferences.facilityType)}
          />
          <InputDropdown
            label="Location Preferences"
            placeholder="Type to filter..."
            multi
            onChange={handleLocationChange}
            options={locationOptions}
            value={new Set(preferences.location)}
          />
          <InputDropdown
            label="Preferred Audience"
            placeholder="Type to filter..."
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
          <FixedFooter />
          <Button
            onClick={handleSubmit}
            position="fixed"
            disabled={
              !preferences.facilityType.length &&
              !preferences.location.length &&
              !preferences.audience.length
            }
          >
            <ContinueText>Continue</ContinueText>
          </Button>
        </ButtonContainer>
      </InlineContainer>
    </Background>
  );
}
