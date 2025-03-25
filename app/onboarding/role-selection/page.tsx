'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import RoleSelector from '@/components/RoleSelector/RoleSelector';
import Back from '@/public/images/back.svg';
import Help from '@/public/images/help.svg';
import Star from '@/public/images/star.svg';
import { withRequireAuth } from '@/utils/AuthProvider';
import { OnboardingContext } from '@/utils/onboardingContext';
import {
  BackButton,
  Background,
  Button,
  ButtonContainer,
  ContinueText,
  Image,
  InlineContainer,
  RoleContainer,
  Title,
} from '../styles';
import { ChooseBothText } from './styles';

function Onboarding() {
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

  const handleContinue = async () => {
    router.push('/onboarding/basic-information');
  };

  const handleBack = async () => {
    router.push('/onboarding/user-role-selection');
  };

  return (
    <Background>
      <InlineContainer>
        <BackButton onClick={handleBack}>
          <Image src={Back} alt="Back icon" />
        </BackButton>
        <Title $fontWeight={500}>
          How would you describe
          <br />
          your role?
        </Title>
        <ProgressBar from={0} to={0} />
        <RoleContainer>
          <RoleSelector
            isSelected={role.isPerformer}
            name="performer"
            title="Performer"
            description="The star of the show"
            iconSrc={Star}
            onChange={handleChange}
          />
          <RoleSelector
            isSelected={role.isHost}
            name="host"
            title="Host"
            description="The organizer of the event"
            iconSrc={Help}
            onChange={handleChange}
          />
          <ChooseBothText>* feel free to choose both!</ChooseBothText>
        </RoleContainer>
        <ButtonContainer>
          <Button
            position="fixed"
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

export default withRequireAuth(Onboarding);
