'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import Back from '@/public/images/back.svg';
import COLORS from '@/styles/colors';
import { P } from '@/styles/text';
import { AvailabilityContext } from '@/utils/availabilityContext';
import {
  BackButton,
  Button,
  ButtonContainer,
  Container,
  ContinueText,
  EventName,
  Image,
  ProgressBarContainer,
  Rectangle,
  SplitText,
  Title,
} from '../styles';
import {
  BulletedList,
  Divider,
  EditButton,
  EditText,
  GradientDivider,
  ReviewContainer,
  TextContainer,
} from './styles';

export default function Page() {
  const router = useRouter();
  const availabilityContext = useContext(AvailabilityContext);

  if (!availabilityContext) return null;

  const { days, generalInfo, times, submitAvailabilityData } =
    availabilityContext;

  const minutesToFormatted = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours > 12 ? hours - 12 : hours;
    return `${formattedHours}:${mins.toString().padStart(2, '0')} ${period}`;
  };
  const Availabilities = days.map(key => {
    return (
      <div key={key}>
        <P $fontWeight={500}>
          {new Date(key).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </P>
        <BulletedList>
          {times[key].map(time => (
            <li key={time.start}>
              {minutesToFormatted(time.start)} - {minutesToFormatted(time.end)}
            </li>
          ))}
        </BulletedList>
      </div>
    );
  });

  const handleBack = () => {
    router.push('/availability/times');
  };

  const handleDetails = () => {
    router.push('/availability/details');
  };

  const handleDays = () => {
    router.push('/availability/days');
  };

  return (
    <Container>
      <ReviewContainer>
        <BackButton onClick={handleBack}>
          <Image src={Back} alt="Back icon" />
        </BackButton>
        <Title $fontWeight={500}> Does everything look right? </Title>
        <ProgressBarContainer>
          <Rectangle variant="dark" width="100%" />
        </ProgressBarContainer>
        <SplitText>
          <Title $fontWeight={500}> About </Title>
          <EditButton onClick={handleDetails}>
            <EditText> edit </EditText>
          </EditButton>
        </SplitText>
        <Divider />
        <TextContainer>
          <div>
            <P $fontWeight={500}> Event Name </P>
            <P $fontWeight={400} $color={COLORS.gray11}>
              {generalInfo.eventName}
            </P>
          </div>
          <div>
            <P $fontWeight={500}> Additional Info </P>
            <P $fontWeight={400} $color={COLORS.gray11}>
              {generalInfo.additionalInfo || '(blank)'}
            </P>
          </div>
        </TextContainer>
        <SplitText>
          <Title $fontWeight={500}> Availabilties </Title>
          <EditButton onClick={handleDays}>
            <EditText> edit </EditText>
          </EditButton>
        </SplitText>
        <Divider />
        <TextContainer> {Availabilities}</TextContainer>
        <GradientDivider />
        <P $fontWeight={400} $color={COLORS.gray11}>
          * Everything can be modified later!
        </P>
        <ButtonContainer>
          <EventName $fontWeight={500}> {generalInfo.eventName} </EventName>
          <Button onClick={submitAvailabilityData}>
            <ContinueText>Everything look&apols;s good!</ContinueText>
          </Button>
        </ButtonContainer>
      </ReviewContainer>
    </Container>
  );
}
