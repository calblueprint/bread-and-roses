'use client';

import type { UUID } from 'crypto';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  fetchAvailabilityByAvailabilityId,
  fetchDatesByAvailabilityID,
} from '@/api/supabase/queries/availability';
import Back from '@/public/images/back.svg';
import Edit from '@/public/images/edit_availability.svg';
import COLORS from '@/styles/colors';
import { P } from '@/styles/text';
import { Availabilities, AvailableDates } from '@/types/schema';
import {
  AvailabilityContext,
  GeneralInfo,
  TimeRange,
} from '@/utils/availabilityContext';
import formatTime from '@/utils/formatTime';
import { AvailabilityDiv, BackButton, Image, SplitText } from '../styles';
import {
  AvailabilityContainer,
  AvailabilityRow,
  Container,
  DayColumn,
  Divider,
  EditButton,
  EditIcon,
  MonthDay,
  ReviewContainer,
  TextContainer,
  TimeColumn,
  Times,
  Title,
  Weekday,
} from './styles';

export default function AvailabilityInfoPage({
  params,
}: {
  params: { availability_id: UUID };
}) {
  const router = useRouter();
  const [availableDates, setAvailableDates] = useState<AvailableDates[]>([]);
  const availabilityContext = useContext(AvailabilityContext);
  const [isAvailabilityLoaded, setIsAvailabilityLoaded] = useState(false);

  useEffect(() => {
    async function fetchAvailabilityData() {
      try {
        if (!availabilityContext || isAvailabilityLoaded) {
          return;
        }

        const { setGeneralInfo, setDays, setTimes } = availabilityContext;
        const availabilities: Availabilities =
          await fetchAvailabilityByAvailabilityId(params.availability_id);
        if (!availabilities) return;
        const dates = await fetchDatesByAvailabilityID(params.availability_id);
        if (!dates) return;

        /* Add availability information to AvailabilityContext to prefill data on editing */
        const { availability_id, ...generalInfoData } = availabilities;
        const generalInfo: GeneralInfo = {
          eventName: generalInfoData.name,
          additionalInfo: generalInfoData.additional_info,
          facilityId: generalInfoData.facility_id,
          availabilityId: availability_id,
        };

        setGeneralInfo(generalInfo);
        setTimes(timesToMinutes(dates));
        setAvailableDates(dates);
        setDays([
          ...new Set(
            dates.map(date =>
              new Date(date.start_date_time).toLocaleDateString('en-US'),
            ),
          ),
        ]);

        /* Prevent setting AvailabilityContext in useEffect from infinitely rendering */
        setIsAvailabilityLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchAvailabilityData();
  }, [params.availability_id, availabilityContext, isAvailabilityLoaded]);

  if (!availabilityContext) {
    return null;
  }

  const { generalInfo } = availabilityContext;

  const timesToMinutes = (
    availableDates: AvailableDates[],
  ): { [date: string]: TimeRange[] } => {
    const times: { [date: string]: TimeRange[] } = {};

    availableDates.forEach(({ start_date_time, end_date_time }) => {
      const startDate = new Date(start_date_time);
      const endDate = new Date(end_date_time);
      const key = startDate.toLocaleDateString('en-US');

      const startMinutes = startDate.getHours() * 60 + startDate.getMinutes();
      const endMinutes = endDate.getHours() * 60 + endDate.getMinutes();

      if (!times[key]) {
        times[key] = [];
      }
      times[key].push({
        id: crypto.randomUUID(),
        start: startMinutes,
        end: endMinutes,
      });
    });

    return times;
  };

  /* Group dates by day */
  const groupedDays = availableDates.reduce(
    (grouped, date) => {
      const dateObj = new Date(date.start_date_time);
      const weekday = dateObj.toLocaleDateString('en-US', {
        weekday: 'short',
      });
      const monthDay = dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      const dateKey = `${weekday},${monthDay}`;

      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(date);
      return grouped;
    },
    {} as { [key: string]: AvailableDates[] },
  );

  const availabilities = Object.entries(groupedDays)
    .sort(([dateA], [dateB]) => {
      const a = new Date(dateA).getTime();
      const b = new Date(dateB).getTime();
      return a - b;
    })
    .map(([date, times]) => {
      const [weekday, monthDay] = date.split(',');

      return (
        <AvailabilityRow key={date}>
          <DayColumn>
            <Weekday>{weekday}</Weekday>
            <MonthDay>{monthDay}</MonthDay>
          </DayColumn>
          <TimeColumn>
            {times.map(time => {
              const formattedTime = formatTime(
                new Date(time.start_date_time),
                new Date(time.end_date_time),
                false,
                false,
              );
              return <Times key={time.date_id}>{formattedTime}</Times>;
            })}
          </TimeColumn>
        </AvailabilityRow>
      );
    });

  const handleBack = () => {
    router.push('/availability/general');
  };

  const handleDetails = () => {
    router.push('/availability/details');
  };

  return isAvailabilityLoaded ? (
    <Container>
      <ReviewContainer>
        <BackButton onClick={handleBack}>
          <Image src={Back} alt="Back icon" />
        </BackButton>
        <SplitText>
          <Title $color={COLORS.gray12}> {generalInfo.eventName} </Title>
          <EditButton onClick={handleDetails}>
            <EditIcon src={Edit} alt="Edit icon" />
          </EditButton>
        </SplitText>
        <Divider />
        <TextContainer>
          <P $fontWeight={400}>{generalInfo.additionalInfo || '(blank)'}</P>
        </TextContainer>
        <AvailabilityDiv>
          <SplitText>
            <Title $color={COLORS.gray12}> Availabilities </Title>
          </SplitText>
        </AvailabilityDiv>
        <Divider />
        <AvailabilityContainer>{availabilities}</AvailabilityContainer>
      </ReviewContainer>
    </Container>
  ) : null;
}
