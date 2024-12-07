'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import RoleSelector from '@/components/RoleSelector/RoleSelector';
import Back from '@/public/images/back.svg';
import Help from '@/public/images/help.svg';
import Star from '@/public/images/star.svg';
import { OnboardingContext } from '@/utils/onboardingContext';
import {
  Background,
  Button,
  ButtonContainer,
  ContinueText,
  Image,
  InlineContainer,
  ProgressBarContainer,
  Rectangle,
  RoleContainer,
  Title,
} from '../styles';
import { ChooseBothText } from './styles';

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
        <RoleContainer>
          <RoleSelector
            isSelected={role.isPerformer}
            name="isPerformer"
            title="Performer"
            description="The star of the show"
            iconSrc={Star}
            onChange={handleChange}
          />
          <RoleSelector
            isSelected={role.isHost}
            name="isHost"
            title="Host"
            description="The organizer of the event"
            iconSrc={Help}
            onChange={handleChange}
          />
          <ChooseBothText>* feel free to choose both!</ChooseBothText>
        </RoleContainer>
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
