import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { fetchFacilityById } from '@/api/supabase/queries/facilities';
import LocationPin from '@/public/images/location_pin.svg';
import COLORS from '@/styles/colors';
import { Event, Facilities } from '@/types/schema';
import facilityTypeToPhoto from '@/utils/facilityTypeToPhoto';
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
  StyledLink,
  Subtitle,
  SubtitleText,
  TextContainer,
} from './styles';

export default function DiscoverCard({
  search,
  event,
}: {
  search: boolean;
  event: Event;
}) {
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
    if (facility?.type) {
      tags.push(
        <IndividualTag $bgColor={COLORS.bread6} key="bgColor">
          {facility?.type}
        </IndividualTag>,
      );
    }
    if (event?.needs_host) {
      tags.push(
        <IndividualTag $bgColor={COLORS.rose6} key="host">
          Host Needed
        </IndividualTag>,
      );
    }
    if (facility?.audience) {
      for (const audience of facility?.audience) {
        tags.push(
          <IndividualTag $bgColor={COLORS.lilac3} key={audience}>
            {audience}
          </IndividualTag>,
        );
      }
    }

    setTagsToShow(tags);
    setHiddenTagCount(0);
  }, [event, facility]);

  /* Iteratively remove IndividualTags until all fit in EventTag container. */
  useLayoutEffect(() => {
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

        let totalWidth = 0;
        let visibleCount = tagWidths.length;

        for (let i = 0; i < tagWidths.length; i++) {
          totalWidth += tagWidths[i];
          if (totalWidth > containerWidth) {
            visibleCount = i;
            break;
          }
        }

        const newTags = tagsToShow.slice(0, visibleCount);
        const hiddenCount = tagsToShow.length - visibleCount;

        if (newTags.length !== tagsToShow.length) {
          setTagsToShow(newTags);
          setHiddenTagCount(hiddenCount);
        }
      }
    };

    if (tagsToShow.length > 0) {
      checkOverflow();
    }
  });

  if (!facility || !eventDate) {
    return null;
  }

  return (
    <StyledLink href={`/discover/${event.event_id}`}>
      <Container $search={search}>
        <ImageContainer $search={search}>
          {facilityTypeToPhoto(facility.type)}
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
    </StyledLink>
  );
}
