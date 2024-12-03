'use client';

import { useContext } from 'react';
import Link from 'next/link';
import InputDropdown from '@/components/InputDropdown/InputDropdown';
import Back from '@/public/images/back.svg';
import { H4 } from '@/styles/text';
import { OnboardingContext } from '@/utils/onboardingContext';
import {
  Background,
  Button,
  ButtonContainer,
  ContinueText,
  Image,
  StyledLink,
} from '../styles';
import { Container, InlineContainer, Rectangle } from './styles';

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

  return (
    <Background>
      <InlineContainer>
        <Link href="/onboarding/role">
          <Image src={Back} alt="Back icon" />
        </Link>
        <Container>
          <H4>What would you like to perform?</H4>
          <Rectangle />
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
        <StyledLink href="/onboarding/general">
          <ButtonContainer>
            <Button>
              <ContinueText>Continue</ContinueText>
            </Button>
          </ButtonContainer>
        </StyledLink>
      </InlineContainer>
    </Background>
  );
}
