'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UUID } from 'crypto';
import { fetchEventById } from '@/api/supabase/queries/events';
import { fetchFacilityById } from '@/api/supabase/queries/facilities';
import { eventSignUp } from '@/api/supabase/queries/volunteers';
import Back from '@/public/images/back.svg';
import LocationPin from '@/public/images/location_pin.svg';
import COLORS from '@/styles/colors';
import { SMALL } from '@/styles/text';
import { Event, Facilities } from '@/types/schema';
import { useSession } from '@/utils/AuthProvider';
import {
  About,
  AboutText,
  BackButton,
  Body,
  Bullet,
  Checkbox,
  Container,
  FacilityName,
  HostWarningTitle,
  Image,
  IndividualTag,
  InterestBlock,
  InterestTitle,
  Location,
  ShowInterest,
  SignUp,
  TagDiv,
  TextWithIcon,
  Time,
  Title,
} from './styles';

function InterestBlockGen(title: string, about: string, icon: string) {
  return (
    <InterestBlock>
      {' '}
      <Checkbox type="checkbox" />
      <TextWithIcon>
        <div>
          <InterestTitle $fontWeight="500"> {title}</InterestTitle>
          <SMALL $color="#515151"> {about} </SMALL>
        </div>
        <Image src={icon} alt="Icon" width={0} height={0}></Image>
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
  const { session } = useSession();

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
        {event && (
          <TagDiv>
            {event?.needs_host && (
              <IndividualTag $bgColor={COLORS.rose6}>Host Needed</IndividualTag>
            )}
            <IndividualTag $bgColor={COLORS.bread6}>
              {event?.performance_type}
            </IndividualTag>
            <IndividualTag $bgColor={COLORS.lilac3}>
              {event?.genre}
            </IndividualTag>
          </TagDiv>
        )}
        <About> About </About>
        <AboutText>
          Lorem ipsum dolor sit amet consectetur. Arcu neque neque diam tortor
          amet. Eget quam sit eu nisl fermentum ac ipsum morbi. Gravida
          convallis molestie purus eros magna tempus fermentum. Habitant
          sollicitudin fames mi parturient faucibus odio non habitant diam.
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
        {InterestBlockGen(
          'To Perform',
          'Be the star of the show!',
          '/images/star.svg',
        )}
        {InterestBlockGen(
          'To Host',
          'Help setup the show!',
          '/images/help.svg',
        )}
        <SignUp
          type="button"
          onClick={() => {
            if (session?.user?.id && event?.event_id) {
              eventSignUp({
                id: session.user.id as UUID,
                event_id: event.event_id as UUID,
                role: session.user.role as string,
                group_size: 0,
                additional_info: '',
              });
            } else {
              console.error('Missing user ID or event ID');
            }
          }}
        >
          Sign up
        </SignUp>
      </Body>
    </Container>
  );
}
