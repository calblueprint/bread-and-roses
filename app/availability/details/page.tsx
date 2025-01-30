'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import Back from '@/public/images/back.svg';
import { AvailabilityContext } from '@/utils/availabilityContext';
import {
  Asterisk,
  BackButton,
  Button,
  ButtonContainer,
  Container,
  ContinueText,
  Divider,
  Image,
  QuestionsContainer,
  Title,
} from '../styles';
import {
  AdditionalInfo,
  AdditionalInfoInput,
  EventName,
  EventNameInput,
} from './styles';

export default function Page() {
  const router = useRouter();
  const availabilityContext = useContext(AvailabilityContext);

  if (!availabilityContext) return null;

  const { generalInfo, setGeneralInfo } = availabilityContext;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setGeneralInfo({
      ...generalInfo,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (!generalInfo.eventName) {
      return;
    }
    router.push('/availability/days');
  };

  const handleBack = () => {
    router.push('/availability/general');
  };

  return (
    <Container>
      <QuestionsContainer>
        <BackButton onClick={handleBack}>
          <Image src={Back} alt="Back icon" />
        </BackButton>
        <Title $fontWeight={500}> What&apos;s the Occasion? </Title>
        <ProgressBar from={0} to={25} />
        <EventName>
          Event Name &nbsp; <Asterisk> * </Asterisk>
        </EventName>
        <EventNameInput
          placeholder="Event Name"
          name="eventName"
          value={generalInfo.eventName}
          onChange={handleChange}
        />
        <AdditionalInfo> Additional Info </AdditionalInfo>
        <AdditionalInfoInput
          name="additionalInfo"
          value={generalInfo.additionalInfo}
          onChange={handleChange}
        />
      </QuestionsContainer>
      <ButtonContainer>
        <Divider />
        <Button onClick={handleSubmit} disabled={!generalInfo.eventName}>
          <ContinueText>Continue</ContinueText>
        </Button>
      </ButtonContainer>
    </Container>
  );
}
