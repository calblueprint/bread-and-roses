import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { fetchFacilityById } from '@/api/supabase/queries/facilities';
import LocationPin from '@/public/images/location_pin.svg';
import COLORS from '@/styles/colors';
import { Event, Facilities } from '@/types/schema';
import performanceToPhotoMap from '@/utils/performanceToPhoto';
import {
  Container,
  EventLabel,
  EventTag,
  EventTitle,
  Icon,
  ImageContainer,
  IndividualTag,
  LocationText,
  MoreTags,
  Subtitle,
  SubtitleText,
  TextContainer,
} from './styles';

export default function DiscoverCard({ event }: { event: Event }) {
  const [facility, setFacility] = useState<Facilities>();
  const [eventDate, setEventDate] = useState<string>();

  const [tagsToShow, setTagsToShow] = useState<JSX.Element[]>([]);
  const [hiddenTagCount, setHiddenTagCount] = useState<number>(0);
  const tagsContainerRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    const tags: JSX.Element[] = [];

    if (event?.needs_host) {
      tags.push(
        <IndividualTag $bgColor={COLORS.rose6}>Host Needed</IndividualTag>,
      );
    }
    if (event?.performance_type) {
      tags.push(
        <IndividualTag $bgColor={COLORS.bread6}>
          {event?.performance_type}
        </IndividualTag>,
      );
    }
    if (event?.genre) {
      tags.push(
        <IndividualTag $bgColor={COLORS.lilac3}>{event?.genre}</IndividualTag>,
      );
    }

    setTagsToShow(tags);
    setHiddenTagCount(0);
  }, [event]);

  /* Iteratively remove IndividualTags until all fit in EventTag container. */
  useEffect(() => {
    const checkOverflow = () => {
      if (tagsContainerRef.current) {
        const containerWidth = tagsContainerRef.current.offsetWidth;

        /* Calculate the width of all current tags, including the hidden tag count. */
        const tagWidths = Array.from(tagsContainerRef.current.children).map(
          child => {
            const width = (child as HTMLElement).offsetWidth;
            /* .offsetWidth does not include margins, we need to add this additional
            calculation to account for all the space taken up by the tags*/
            const marginRight = parseInt(
              window.getComputedStyle(child as HTMLElement).marginRight,
              10,
            );
            return width + marginRight;
          },
        );

        let totalWidth = tagWidths.reduce((a, b) => a + b, 0);

        if (totalWidth > containerWidth) {
          const newTags = tagsToShow.slice(0, -1);
          setHiddenTagCount(prev => prev + 1);
          setTagsToShow(newTags);
          totalWidth -= tagWidths.pop() ?? 0;
        }
      }
    };

    if (tagsToShow.length > 0) {
      checkOverflow();
    }
  }, [tagsToShow.length, tagsContainerRef.current]);

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
            <Subtitle>
              <SubtitleText>{eventDate}</SubtitleText>
            </Subtitle>
            <EventTitle>{facility.name}</EventTitle>
            <Subtitle>
              <Icon src={LocationPin} alt="Location" />
              <LocationText>{facility.city}</LocationText>
            </Subtitle>
          </EventLabel>
          <EventTag ref={tagsContainerRef}>
            {tagsToShow}
            {hiddenTagCount > 0 && <MoreTags>+{hiddenTagCount}</MoreTags>}
          </EventTag>
        </TextContainer>
      </Container>
    </Link>
  );
}
