'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
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
  InputContainer,
  Label,
  SkipButton,
  SkipText,
  Title,
} from '../styles';
import { TextArea } from './styles';

export default function Onboarding() {
  const router = useRouter();
  const onboardingContext = useContext(OnboardingContext);
  if (!onboardingContext) return null;

  const { role } = onboardingContext;
  const { preferences, setPreferences } = onboardingContext;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setPreferences({
      ...preferences,
      additionalInfo: value,
    });
  };

  const handleSubmit = async () => {
    router.push('/onboarding/review');
  };

  const handleBack = () => {
    if (role.isPerformer) {
      router.push('/onboarding/performance');
    } else {
      router.push('/onboarding/show-preference');
    }
  };

  return (
    <ProtectedRoute allowWithoutRole>
      <Background>
        <InlineContainer>
          <BackButton onClick={handleBack}>
            <Image src={Back} alt="Back icon" />
          </BackButton>
          <Title $fontWeight={500}>
            Do you have anything
            <br />
            you&apos;d like to add?
          </Title>
          {role.isPerformer ? (
            <ProgressBar from={60} to={80} />
          ) : (
            <ProgressBar from={50} to={75} />
          )}
          <Container>
            <InputContainer>
              <Label>Additional Information</Label>
              <TextArea
                name="additional information"
                placeholder="i.e. I need help carrying my equipments."
                value={preferences.additionalInfo}
                onChange={handleChange}
              />
            </InputContainer>
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
    </ProtectedRoute>
  );
}
