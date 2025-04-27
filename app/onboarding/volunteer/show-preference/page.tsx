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
  'Contra Costa',
  'Marin',
  'Napa',
  'San Francisco',
  'San Mateo',
  'Santa Clara',
  'Sonoma',
]);

const audienceOptions = new Set(['Youth', 'Adults', 'Senior ']);

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
