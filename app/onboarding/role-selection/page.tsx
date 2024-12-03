'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import Back from '@/public/images/back.svg';
import Help from '@/public/images/help.svg';
import Star from '@/public/images/star.svg';
import { H6, SMALL } from '@/styles/text';
import { OnboardingContext } from '@/utils/onboardingContext';
import {
  Background,
  Button,
  ButtonContainer,
  Checkbox,
  ContinueText,
  Image,
  InlineContainer,
  ProgressBarContainer,
  Rectangle,
  Title,
} from '../styles';
import {
  BoxContainer,
  ChooseBothText,
  Container,
  Icon,
  RoleContainer,
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
    router.push('/onboarding/basic-information');
  };

  return (
    <Background>
      <InlineContainer>
        <Image src={Back} alt="Back icon" />
        <Title $fontWeight={500}>
          How would you describe
          <br />
          your role?
        </Title>
        <ProgressBarContainer>
          <Rectangle variant="dark" width="0%" />
          <Rectangle variant="light" width="100%" />
        </ProgressBarContainer>
        <Container>
          <BoxContainer isSelected={role.isPerformer}>
            <RoleContainer>
              <Checkbox
                name="performer"
                checked={role.isPerformer}
                onChange={handleChange}
              />
              <TextContainer>
                <H6 $fontWeight={500}>Performer</H6>
                <SMALL $fontWeight={400}>The star of the show</SMALL>
              </TextContainer>
            </RoleContainer>
            <Icon src={Star} alt="performer" />
          </BoxContainer>
          <BoxContainer isSelected={role.isHost}>
            <RoleContainer>
              <Checkbox
                name="host"
                checked={role.isHost}
                onChange={handleChange}
              />
              <TextContainer>
                <H6 $fontWeight={500}>Host</H6>
                <SMALL $fontWeight={400}>Making the show happen</SMALL>
              </TextContainer>
            </RoleContainer>
            <Icon src={Help} alt="host" />
          </BoxContainer>
          <ChooseBothText>* feel free to choose both!</ChooseBothText>
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
