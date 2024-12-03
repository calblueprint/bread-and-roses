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

const groupingOptions = new Set([
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
    setPreferences({ ...preferences, typeOfAct: selectedArray });
  };

  const handleGenreChange = (selectedOptions: Set<string>) => {
    const selectedArray = Array.from(selectedOptions);
    setPreferences({ ...preferences, genre: selectedArray });
  };

  const handleGroupingChange = (selectedOptions: Set<string>) => {
    const selectedArray = Array.from(selectedOptions);
    setPreferences({ ...preferences, grouping: selectedArray });
  };

  const handleSubmit = async () => {
    router.push('/onboarding/review');
  };

  return (
    <Background>
      <InlineContainer>
        <Link href="/onboarding/show">
          <Image src={Back} alt="Back icon" />
        </Link>
        <Title $fontWeight={500}>
          What would you like to
          <br />
          perform?
        </Title>
        <div>
          <Rectangle variant="dark" width="50%" />
          <Rectangle variant="light" width="50%" />
        </div>
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
            label="Performance Grouping"
            placeholder="Select grouping type"
            multi
            onChange={handleGroupingChange}
            options={groupingOptions}
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
