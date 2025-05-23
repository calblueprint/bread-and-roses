'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import RoleSelector from '@/components/RoleSelector/RoleSelector';
import Back from '@/public/images/back.svg';
import Help from '@/public/images/help.svg';
import HelpRed from '@/public/images/helpred.svg';
import Star from '@/public/images/star.svg';
import StarRed from '@/public/images/starred.svg';
import { OnboardingContext } from '@/utils/onboardingContext';
import {
  BackButton,
  Background,
  Button,
  ButtonContainer,
  ContinueText,
  FixedFooter,
  Image,
  InlineContainer,
  RoleContainer,
  Title,
} from '../../styles';
import { SelectAll } from './styles';

export default function Onboarding() {
  const router = useRouter();

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
    router.push('/onboarding/volunteer/basic-information');
  };

  const handleBack = async () => {
    router.push('/roles');
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
        <SelectAll>Please select all that apply.</SelectAll>
        <RoleContainer>
          <RoleSelector
            isSelected={role.isPerformer}
            name="performer"
            title="Performer"
            description="The star of the show"
            iconSrc={role.isPerformer ? StarRed : Star}
            onChange={handleChange}
          />
          <RoleSelector
            isSelected={role.isHost}
            name="host"
            title="Host"
            description="The organizer of the event"
            iconSrc={role.isHost ? HelpRed : Help}
            onChange={handleChange}
          />
        </RoleContainer>
        <ButtonContainer>
          <FixedFooter />
          <Button
            position="sticky"
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
