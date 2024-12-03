'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { H4, P } from '@/styles/text';
import { OnboardingContext } from '@/utils/onboardingContext';
import { Background, Button, ButtonContainer, ContinueText } from '../styles';
import {
  BoxContainer,
  Checkbox,
  Container,
  InlineContainer,
  Rectangle,
  TextContainer,
} from './styles';

export default function Onboarding() {
  const router = useRouter();

  // Access the onboarding context
  const onboardingContext = useContext(OnboardingContext);

  if (!onboardingContext) return null;

  const { role, setRole } = onboardingContext;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setRole({
      ...role,
      [name === 'host' ? 'isHost' : 'isPerformer']: checked,
    });
  };

  const handleContinue = () => {
    router.push('/onboarding/general');
  };

  return (
    <Background>
      <InlineContainer>
        <Container>
          <H4>How would you describe your role?</H4>
          <Rectangle />
          <BoxContainer>
            <Checkbox
              type="checkbox"
              name="performer"
              checked={role.isPerformer}
              onChange={handleChange}
            />
            <TextContainer>
              <P>Performer</P>
              <small>The star of the show</small>
            </TextContainer>
          </BoxContainer>
          <BoxContainer>
            <Checkbox
              type="checkbox"
              name="host"
              checked={role.isHost}
              onChange={handleChange}
            />
            <TextContainer>
              <P>Host</P>
              <small>Making the show happen</small>
            </TextContainer>
          </BoxContainer>
        </Container>
        <ButtonContainer>
          <Button
            onClick={handleContinue}
            disabled={!role.isHost && !role.isPerformer}
          >
            <ContinueText>Continue</ContinueText>
          </Button>
        </ButtonContainer>
      </InlineContainer>
    </Background>
  );
}
