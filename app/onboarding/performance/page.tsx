'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import InputDropdown from '@/components/InputDropdown/InputDropdown';
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
  ProgressBarContainer,
  Rectangle,
  SkipButton,
  SkipText,
  Title,
} from '../styles';

const performanceTypeOptions = new Set([
  'Music',
  'Dance',
  'Poetry',
  'Clowning',
  'Juggling',
  'Comedy',
  'Magic',
  'Storytelling',
  'Bubbles',
  'Puppetry',
  'Other',
]);

const genreOptions = new Set([
  'A Cappella',
  'Bluegrass',
  'Blues',
  "Children's songs",
  'Classical',
  'Country',
  'Folk',
  'Jazz',
  'Pop',
  'R&B',
  'Rock',
  'Standards',
  'Other',
]);

const performerTypeOptions = new Set([
  'Solo',
  'Duo',
  'Trio',
  'Quartet',
  'Five or more',
  'Other',
]);

export default function Onboarding() {
  const router = useRouter();
  const onboardingContext = useContext(OnboardingContext);

  if (!onboardingContext) return null;

  const { preferences, setPreferences } = onboardingContext;

  const handlePerformanceTypeChange = (selectedOptions: Set<string>) => {
    const selectedArray = Array.from(selectedOptions);
    setPreferences({ ...preferences, performanceType: selectedArray });
  };

  const handleGenreChange = (selectedOptions: Set<string>) => {
    const selectedArray = Array.from(selectedOptions);
    setPreferences({ ...preferences, genre: selectedArray });
  };

  const handlePerformerTypeChange = (selectedOptions: Set<string>) => {
    const selectedArray = Array.from(selectedOptions);
    setPreferences({ ...preferences, performerType: selectedArray });
  };

  const handleSubmit = async () => {
    router.push('/onboarding/additional-info');
  };

  const handleBack = () => {
    router.push('/onboarding/show-preference');
  };

  return (
    <Background>
      <InlineContainer>
        <BackButton onClick={handleBack}>
          <Image src={Back} alt="Back icon" />
        </BackButton>
        <Title $fontWeight={500}>
          What would you like to
          <br />
          perform?
        </Title>
        <ProgressBarContainer>
          <Rectangle variant="dark" width="50%" />
          <Rectangle variant="light" width="50%" />
        </ProgressBarContainer>
        <Container>
          <InputDropdown
            label="Type of Performance"
            placeholder="Select performance type"
            multi
            onChange={handlePerformanceTypeChange}
            options={performanceTypeOptions}
          />
          <InputDropdown
            label="Performance Genre"
            placeholder="Select genres"
            multi
            onChange={handleGenreChange}
            options={genreOptions}
          />
          <InputDropdown
            label="Group Size"
            placeholder="Type to filter..."
            multi
            onChange={handlePerformerTypeChange}
            options={performerTypeOptions}
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
