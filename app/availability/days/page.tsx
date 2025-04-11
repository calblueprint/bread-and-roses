'use client';

import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import Back from '@/public/images/back.svg';
import {
  AvailabilityContext,
  defaultRange,
  TimeRange,
} from '@/utils/availabilityContext';
import {
  BackButton,
  Button,
  ButtonContainer,
  Container,
  ContinueText,
  Divider,
  EventName,
  Image,
  Title,
} from '../styles';
import { CalendarContainer } from './styles';

type Info = {
  start: Date;
  end: Date;
};

type DateObj = {
  date: Date;
};

export default function Page() {
  const [curMonth, setMonth] = useState<number>();
  const router = useRouter();
  const availabilityContext = useContext(AvailabilityContext);

  if (!availabilityContext) return null;

  const { generalInfo, days, setDays, times, setTimes } = availabilityContext;

  const handleSelect = (info: Info) => {
    const { start, end } = info; // Get start and end of the selected range
    while (start < end) {
      if (!checkValidSelectDate(start)) {
        const dateStr: string = start.toISOString();
        if (days.includes(dateStr)) {
          setDays(days.filter(days => days !== dateStr));
        } else {
          setDays([...days, dateStr]);
        }
      }
      start.setDate(start.getDate() + 1); // Move to the next day
    }
  };

  const updateMonth = (info: Info) => {
    const middate = new Date((info.start.getTime() + info.end.getTime()) / 2);
    setMonth(middate.getMonth());
  };

  const dayCellClassNames = (date: DateObj) => {
    const dateObj = date.date;
    const dateStr = dateObj.toISOString();
    const month = dateObj.getMonth();
    // Default classes
    const classNames = [];

    // Highlight selected dates
    if (days.includes(dateStr)) {
      classNames.push('selected-date');
      if (curMonth != month) {
        classNames.push('non-cur-selected');
      } else {
        classNames.push('cur-selected');
      }
    }

    if (checkValidSelectDate(dateObj)) {
      // 0 = Sunday, 6 = Saturday
      classNames.push('unselectable');
    }

    // Return the dynamic class names
    return classNames;
  };

  function checkValidSelectDate(date: Date): boolean {
    const day = date.getDay();
    const month = date.getMonth();
    const today = new Date();

    const sameDay =
      date.getDate() == today.getDate() && date.getMonth() == today.getMonth();
    if (
      day === 0 ||
      day === 6 ||
      (!sameDay && date < today) ||
      (curMonth != null && curMonth != month)
    ) {
      // 0 = Sunday, 6 = Saturday
      return true;
    }
    return false;
  }

  const handleSubmit = async () => {
    if (!days) {
      return;
    }
    setDays(days.sort((a, b) => a.localeCompare(b)));
    console.log(times);
    const initTimes: { [date: string]: TimeRange[] } = {};
    for (const day of days) {
      if (day in times) {
        initTimes[day] = times[day];
      } else {
        initTimes[day] = [structuredClone(defaultRange)];
      }
    }
    setTimes(initTimes);
    router.push('/availability/times');
  };

  const handleBack = () => {
    router.push('/availability/details');
  };
  return (
    <ProtectedRoute requiredRole="facility">
      <Container>
        <BackButton onClick={handleBack}>
          <Image src={Back} alt="Back icon" />
        </BackButton>
        <Title $fontWeight={500}> What day&apos;s work best? </Title>
        <ProgressBar from={25} to={50} />
        <CalendarContainer>
          <FullCalendar
            plugins={[interactionPlugin, dayGridPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'title',
              center: '',
              right: 'prev next',
            }}
            dayCellContent={arg => arg.date.getDate()}
            selectable={true}
            dayCellClassNames={dayCellClassNames}
            selectOverlap={false}
            select={handleSelect}
            datesSet={updateMonth}
          />
        </CalendarContainer>
        <ButtonContainer>
          <EventName $fontWeight={500}> {generalInfo.eventName} </EventName>
          <Divider />
          <Button onClick={handleSubmit} disabled={days.length == 0}>
            <ContinueText>Continue</ContinueText>
          </Button>
        </ButtonContainer>
      </Container>
    </ProtectedRoute>
  );
}
