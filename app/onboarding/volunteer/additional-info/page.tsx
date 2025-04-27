'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
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
  InputContainer,
  Label,
  Title,
} from '../../styles';
import { TextArea } from './styles';

export default function Onboarding() {
  const router = useRouter();
  const onboardingContext = useContext(OnboardingContext);
  if (!onboardingContext) return null;

  const { role } = onboardingContext;
  const { preferences, setPreferences } = onboardingContext;

  let progress = 0;
  // number of steps in each onboarding
  if (role.isHost && role.isPerformer) {
    progress = (6 * 100) / 7;
  } else if (role.isHost) {
    progress = (4 * 100) / 5;
  } else {
    progress = (5 * 100) / 6;
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setPreferences({
      ...preferences,
      additionalInfo: value,
    });
  };

  const handleSubmit = async () => {
    router.push('/onboarding/volunteer/review');
  };

  const handleBack = () => {
    if (role.isHost) {
      router.push('/onboarding/volunteer/host-show-preference');
    } else {
      router.push('/onboarding/volunteer/equipment');
    }
  };

  return (
    <Background>
      <InlineContainer>
        <BackButton onClick={handleBack}>
          <Image src={Back} alt="Back icon" />
        </BackButton>
        <Title $fontWeight={500}>Do you require any accomodations?</Title>
        <ProgressBar from={progress} to={progress} />
        <Container>
          <InputContainer>
            <Label>Additional Information</Label>
            <TextArea
              name="additional information"
              placeholder=""
              value={preferences.additionalInfo}
              onChange={handleChange}
            />
          </InputContainer>
        </Container>

        <ButtonContainer>
          <FixedFooter />
          <Button onClick={handleSubmit} position="fixed">
            <ContinueText>Continue</ContinueText>
          </Button>
        </ButtonContainer>
      </InlineContainer>
    </Background>
  );
}
