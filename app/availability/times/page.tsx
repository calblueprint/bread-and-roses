'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import DateTimeSelection from '@/components/DateTimeSelection/DateTimeSelection';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import Back from '@/public/images/back.svg';
import { AvailabilityContext } from '@/utils/availabilityContext';
import {
  AnswerContainer,
  BackButton,
  Button,
  ButtonContainer,
  Container,
  ContinueText,
  Divider,
  EventName,
  Image,
  SplitText,
  Title,
} from '../styles';
import { DaylightTime, TimeContainer } from './styles';

export default function Page() {
  const router = useRouter();
  const availabilityContext = useContext(AvailabilityContext);

  if (!availabilityContext) return null;

  const { days, generalInfo } = availabilityContext;
  const handleBack = () => {
    router.push('/availability/days');
  };

  const handleSubmit = async () => {
    if (!days) {
      return;
    }
    router.push('/availability/review');
  };

  return (
    <Container>
      <TimeContainer>
        <BackButton onClick={handleBack}>
          <Image src={Back} alt="Back icon" />
        </BackButton>
        <Title $fontWeight={500}> What time&apos;s work best? </Title>
        <ProgressBar from={50} to={75} />
        <AnswerContainer>
          {days.map((day, index) => (
            <DateTimeSelection date={day} key={index} />
          ))}
        </AnswerContainer>
      </TimeContainer>
      <ButtonContainer>
        <SplitText>
          <EventName $fontWeight={500}> {generalInfo.eventName} </EventName>
          <DaylightTime> PDT </DaylightTime>
        </SplitText>
        <Divider />
        <Button onClick={handleSubmit} disabled={days.length == 0}>
          <ContinueText>Continue</ContinueText>
        </Button>
      </ButtonContainer>
    </Container>
  );
}
