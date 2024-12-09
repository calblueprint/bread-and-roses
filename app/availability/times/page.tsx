'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import DateTimeSelection from '@/components/DateTimeSelection/DateTimeSelection';
import Back from '@/public/images/back.svg';
import { AvailabilityContext } from '@/utils/availabilityContext';
import {
  BackButton,
  Button,
  ButtonContainer,
  Container,
  ContinueText,
  Divider,
  EventName,
  Image,
  ProgressBarContainer,
  Rectangle,
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
        <ProgressBarContainer>
          <Rectangle variant="dark" width="75%" />
          <Rectangle variant="light" width="25%" />
        </ProgressBarContainer>
        {days.map((day, index) => (
          <DateTimeSelection date={day} key={index} />
        ))}
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
