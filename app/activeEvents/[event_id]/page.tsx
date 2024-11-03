'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchEventById } from '@/api/supabase/queries/events';
import { fetchFacilityById } from '@/api/supabase/queries/facilities';
import Back from '@/public/images/back.svg';
import Help from '@/public/images/help.svg';
import LocationPin from '@/public/images/location_pin.svg';
import Star from '@/public/images/star.svg';
import { SMALL } from '@/styles/text';
import { Event, Facilities } from '@/types/schema';
import {
  About,
  AboutText,
  BackButton,
  Body,
  Bullet,
  Container,
  FacilityName,
  HostWarningTitle,
  Image,
  IndividualTag,
  InterestBlock,
  InterestTitle,
  Location,
  Select,
  ShowInterest,
  SignUp,
  TagDiv,
  TextWithIcon,
  Time,
  Title,
} from './styles';

function Tags(tags: string[]) {
  return (
    <TagDiv>
      {tags.map((tag, index) => {
        return <IndividualTag key={index}>{tag}</IndividualTag>;
      })}
    </TagDiv>
  );
}

function InterestBlockGen(title: string, about: string) {
  return (
    <InterestBlock>
      {' '}
      <Select />
      <TextWithIcon>
        <div>
          <InterestTitle $fontWeight="500"> {title}</InterestTitle>
          <SMALL $color="#515151"> {about} </SMALL>
        </div>
        <Image src={Help} alt="Test"></Image>
      </TextWithIcon>
    </InterestBlock>
  );
}

export default function EventPage({
  params,
}: {
  params: { event_id: string };
}) {
  const [event, setEvent] = useState<Event>();
  const [facility, setFacility] = useState<Facilities>();

  useEffect(() => {
    const getEvent = async () => {
      const fetchedEvent: Event = await fetchEventById(params.event_id);
      setEvent(fetchedEvent);
      const fetchedFacility: Facilities = await fetchFacilityById(
        fetchedEvent.facility_id,
      );
      setFacility(fetchedFacility);
    };
    getEvent();
  }, [params.event_id]);

  const router = useRouter();
  return (
    <Container>
      <BackButton type="button" onClick={() => router.back()}>
        <Image src={Back} alt="Back icon" />
      </BackButton>
      <Body>
        <Title> Classics for Seniors </Title>
        <Time> September 12, 9-10 PM </Time>
        <Location>
          {' '}
          <Image src={LocationPin} alt="Location"></Image> 1411 E 31st St,
          Oakland, CA{' '}
        </Location>
        {event
          ? event.needs_host
            ? Tags(['Host Needed', event.type_of_act, event.genre])
            : Tags([event.type_of_act, event.genre])
          : ''}
        <About> About </About>
        <AboutText>
          {' '}
          Lorem ipsum dolor sit amet consectetur. Arcu neque neque diam tortor
          amet. Eget quam sit eu nisl fermentum ac ipsum morbi. Gravida
          convallis molestie purus eros magna tempus fermentum. Habitant
          sollicitudin fames mi parturient faucibus odio non habitant diam.{' '}
        </AboutText>
        <FacilityName> {facility?.name} </FacilityName>
        <Bullet>Prefer Orchestra</Bullet>
        {event?.needs_host ? (
          <div>
            <HostWarningTitle> Bread & Roses Presents </HostWarningTitle>
            <Bullet>Host should be able to carry 15lbs of equipment</Bullet>
          </div>
        ) : (
          ''
        )}
        <ShowInterest> Show Interest </ShowInterest>
        {InterestBlockGen('To Perform', 'Be the star of the show!')}
        {InterestBlockGen('To Host', 'Help setup the show!')}
        <SignUp> Sign up</SignUp>
      </Body>
    </Container>
  );
}
