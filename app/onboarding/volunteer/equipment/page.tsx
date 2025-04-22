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
  Title,
} from '../../styles';

const Options = new Set(['Yes', 'No']);

export default function Onboarding() {
  const router = useRouter();
  const onboardingContext = useContext(OnboardingContext);

  if (!onboardingContext) return null;

  const { preferences, setPreferences, role } = onboardingContext;

  let progress = 0;
  // number of steps in each onboarding
  if (role.isHost && role.isPerformer) {
    progress = (4 * 100) / 7;
  } else {
    progress = (4 * 100) / 6;
  }

  const handleInfoChange = (field: string, value: string | null) => {
    if (value) {
      setPreferences({
        ...preferences,
        info: {
          ...preferences.info,
          [field]: value,
        },
      });
    }
  };

  const handleSubmit = async () => {
    router.push('/onboarding/volunteer/additional-info');
  };

  const handleBack = () => {
    router.push('/onboarding/volunteer/performance');
  };

  return (
    <Background>
      <InlineContainer>
        <BackButton onClick={handleBack}>
          <Image src={Back} alt="Back icon" />
        </BackButton>
        <Title $fontWeight={500}>What should we know?</Title>
        <ProgressBar from={progress} to={progress} />
        <Container>
          <InputDropdown
            label="Do you have your own sound equipment?"
            placeholder="No"
            required
            multi={false}
            onChange={selectedOption =>
              handleInfoChange('hasSoundEquipment', selectedOption)
            }
            options={Options}
            value={preferences.info['hasSoundEquipment']}
          />
          <InputDropdown
            label="Do you need a piano for your show? "
            placeholder="No"
            required
            multi={false}
            onChange={selectedOption =>
              handleInfoChange('needsPiano', selectedOption)
            }
            options={Options}
            value={preferences.info['needsPiano']}
          />
          <InputDropdown
            label="Can you host your own show?"
            placeholder="No"
            required
            multi={false}
            onChange={selectedOption =>
              handleInfoChange('canHost', selectedOption)
            }
            options={Options}
            value={preferences.info['canHost']}
          />
        </Container>

        <ButtonContainer>
          <FixedFooter />
          <Button
            onClick={handleSubmit}
            position="fixed"
            disabled={
              !preferences.info.hasSoundEquipment ||
              !preferences.info.needsPiano ||
              !preferences.info.canHost
            }
          >
            <ContinueText>Continue</ContinueText>
          </Button>
        </ButtonContainer>
      </InlineContainer>
    </Background>
  );
}
