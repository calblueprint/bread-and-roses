'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import InputDropdown from '@/components/InputDropdown/InputDropdown';
import Back from '@/public/images/back.svg';
import { OnboardingContext } from '@/utils/onboardingContext';
import {
  Background,
  Button,
  ButtonContainer,
  Container,
  ContinueText,
  Image,
  InlineContainer,
  Rectangle,
  SkipButton,
  SkipContainer,
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

const locationOptions = new Set(['No types yet']);

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
      router.push('/onboarding/performer');
    } else {
      router.push('/onboarding/review');
    }
  };

  return (
    <Background>
      <InlineContainer>
        <Link href="/onboarding/general">
          <Image src={Back} alt="Back icon" />
        </Link>
        <Title $fontWeight={500}>
          Do you have any show
          <br />
          preferences?
        </Title>
        <div>
          <Rectangle variant="dark" width="50%" />
          <Rectangle variant="light" width="50%" />
        </div>
        <Container>
          <InputDropdown
            label="Facility Types"
            placeholder="Type to filter"
            multi
            onChange={handleFacilityChange}
            options={facilityTypeOptions}
          />
          <InputDropdown
            label="Location Preferences"
            placeholder="Type to filter"
            multi
            onChange={handleLocationChange}
            options={locationOptions}
          />
          <InputDropdown
            label="Preferred Audience"
            placeholder="Type to filter"
            multi
            onChange={handleAudienceChange}
            options={audienceOptions}
          />
        </Container>

        <SkipContainer>
          <SkipButton onClick={handleSubmit}>
            <SkipText>skip</SkipText>
          </SkipButton>
        </SkipContainer>

        <ButtonContainer>
          <Button onClick={handleSubmit}>
            <ContinueText>Continue</ContinueText>
          </Button>
        </ButtonContainer>
      </InlineContainer>
    </Background>
  );
}
