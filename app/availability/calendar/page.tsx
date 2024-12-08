'use client';

import React, { useState } from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { Container } from './styles';

type Info = {
  start: Date;
  end: Date;
};

type DateObj = {
  date: Date;
};

export default function Page() {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [curMonth, setMonth] = useState<number>();

  const handleSelect = (info: Info) => {
    const { start, end } = info; // Get start and end of the selected range
    while (start < end) {
      if (!checkValidSelectDate(start)) {
        const dateStr = start.toISOString();
        setSelectedDates(prevDates =>
          prevDates.includes(dateStr)
            ? prevDates.filter(date => date !== dateStr)
            : [...prevDates, dateStr],
        );
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
    if (selectedDates.includes(dateStr)) {
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

  return (
    <Container>
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
    </Container>
  );
}
