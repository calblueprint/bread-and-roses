'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import InputDropdown from '@/components/InputDropdown/InputDropdown';
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
  Input,
  InputContainer,
  Label,
  SkipButton,
  SkipText,
  Title,
} from '../../styles';
import { RedAsterisk } from './styles';

const Options = new Set(['Yes', 'No']);

export default function Onboarding() {
  const router = useRouter();
  const onboardingContext = useContext(OnboardingContext);

  if (!onboardingContext) return null;

  const { role } = onboardingContext;
  const { preferences, setPreferences } = onboardingContext;

  let progress = 0;
  // number of steps in each onboarding
  if (role.isHost && role.isPerformer) {
    progress = (5 * 100) / 7;
  } else {
    progress = (3 * 100) / 5;
  }

  const handleInfoChange = (field: string, value: string | null) => {
    setPreferences({
      ...preferences,
      info: {
        ...preferences.info,
        [field]: value,
      },
    });
  };

  const handleSubmit = async () => {
    router.push('/onboarding/volunteer/additional-info');
  };

  const handleBack = () => {
    if (role.isPerformer) {
      router.push('/onboarding/volunteer/equipment');
    } else {
      router.push('/onboarding/volunteer/show-preference');
    }
  };

  return (
    <Background>
      <InlineContainer>
        <BackButton onClick={handleBack}>
          <Image src={Back} alt="Back icon" />
        </BackButton>
        <Title $fontWeight={500}>Additional Host Questions</Title>
        <ProgressBar from={progress} to={progress} />
        <Container>
          <InputContainer>
            <Label>
              What days/times are you usually available to host?{' '}
              <RedAsterisk> *</RedAsterisk>
            </Label>
            <Input
              name="availability"
              placeholder="Tues 5-9pm, Mon 1-3pm..."
              value={preferences.info.host_availability}
              onChange={e =>
                handleInfoChange('host_availability', e.target.value)
              }
            />
          </InputContainer>
          <InputDropdown
            label="Are you willing to come to the Bread & Roses office to pick up sound equipment?"
            placeholder="No"
            multi={false}
            required
            onChange={selectedOption =>
              handleInfoChange(
                'host_willing_to_pick_up_sound_equipment',
                selectedOption,
              )
            }
            options={Options}
            value={preferences.info.host_willing_to_pick_up_sound_equipment}
          />
          <InputDropdown
            label="Are you willing to use sound equipment? "
            placeholder="No"
            required
            multi={false}
            note="(training is provided)"
            onChange={selectedOption =>
              handleInfoChange(
                'host_willing_to_use_sound_equip',
                selectedOption,
              )
            }
            options={Options}
            value={preferences.info.host_willing_to_use_sound_equip}
          />
        </Container>

        <ButtonContainer>
          <SkipButton onClick={handleSubmit}>
            <SkipText>skip</SkipText>
          </SkipButton>
          <FixedFooter />
          <Button
            onClick={handleSubmit}
            position="fixed"
            disabled={
              !preferences.info.host_availability ||
              !preferences.info.host_willing_to_pick_up_sound_equipment ||
              !preferences.info.host_willing_to_use_sound_equip
            }
          >
            <ContinueText>Continue</ContinueText>
          </Button>
        </ButtonContainer>
      </InlineContainer>
    </Background>
  );
}
