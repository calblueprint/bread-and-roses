import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchFacilityById } from '@/api/supabase/queries/facilities';
import Clock from '@/public/images/clock.svg';
import LocationPin from '@/public/images/location_pin.svg';
import { Event, Facilities } from '@/types/schema';
import performanceToPhotoMap from '@/utils/performanceToPhoto';
import {
  Container,
  EventDescription,
  EventLabel,
  EventTitle,
  Icon,
  ImageContainer,
  Subtitle,
  SubtitleText,
  TextContainer,
} from './styles';

export default function DiscoverCard({ event }: { event: Event }) {
  const [facility, setFacility] = useState<Facilities>();
  const [eventDate, setEventDate] = useState<string>();

  useEffect(() => {
    const formatEventDate = () => {
      const startDate = new Date(event.start_date_time);
      const endDate = new Date(event.end_date_time);

      const formatter = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
      });
      const formattedDate = formatter.format(startDate);

      const startTime = startDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      const endTime = endDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });

      const dateString = `${formattedDate}, ${startTime.replace(':00', '')}-${endTime.replace(':00', '')}`;
      setEventDate(dateString);
    };
    formatEventDate();
  }, [event.start_date_time, event.end_date_time]);

  useEffect(() => {
    const getFacility = async () => {
      const fetchedFacility: Facilities = await fetchFacilityById(
        event.facility_id,
      );
      setFacility(fetchedFacility);
    };

    getFacility();
  }, [event.facility_id]);

  if (!facility || !eventDate) {
    return null;
  }

  return (
    <Link href={`/discover/${event.event_id}`}>
      <Container>
        <ImageContainer>
          {performanceToPhotoMap(
            event.performance_type,
            event.genre?.toString() ?? null,
          )}
        </ImageContainer>
        <TextContainer>
          <EventLabel>
            <EventTitle>This is a really, really long event title.</EventTitle>
            <Subtitle>
              <Icon src={LocationPin} alt="Location" />
              <SubtitleText>
                {facility.street_address_1},
                {facility.street_address_2
                  ? ` ${facility.street_address_2}, `
                  : ' '}
                {facility.city}
              </SubtitleText>
            </Subtitle>
            <Subtitle>
              <Icon src={Clock} alt="Date and Time"></Icon>
              <SubtitleText>{eventDate}</SubtitleText>
            </Subtitle>
          </EventLabel>

          <EventDescription>{event.notes}</EventDescription>
        </TextContainer>
      </Container>
    </Link>
  );
}
