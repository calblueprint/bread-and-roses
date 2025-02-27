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
  SignUpContainer,
  TagDiv,
  TextWithIcon,
  Time,
  Title,
} from './styles';

function InterestBlockGen(
  title: string,
  about: string,
  icon: string,
  checked: boolean,
  onChange: () => void,
) {
  return (
    <InterestBlock>
      {' '}
      <Checkbox type="checkbox" checked={checked} onChange={onChange} />
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

  const [performChecked, setPerformChecked] = useState(false);
  const [hostChecked, setHostChecked] = useState(false);

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
          performChecked,
          () => setPerformChecked(!performChecked),
        )}
        {event?.needs_host == true &&
          InterestBlockGen(
            'To Host',
            'Help setup the show!',
            '/images/help.svg',
            hostChecked,
            () => setHostChecked(!hostChecked),
          )}
        <SignUpContainer>
          <SignUp
            type="button"
            onClick={() => {
              if (session?.user?.id && event?.event_id) {
                if (!performChecked && !hostChecked) {
                  console.error('No preference selected.');
                }
                if (performChecked) {
                  eventSignUp({
                    id: session.user.id as UUID,
                    event_id: event.event_id as UUID,
                    role: 'PERFORMER',
                    group_size: 0,
                    additional_info: '',
                  });
                }
                if (hostChecked) {
                  eventSignUp({
                    id: session.user.id as UUID,
                    event_id: event.event_id as UUID,
                    role: 'HOST',
                    group_size: 0,
                    additional_info: '',
                  });
                }
              } else {
                console.error('Missing user ID or event ID');
              }
            }}
          >
            Sign up
          </SignUp>
        </SignUpContainer>
      </Body>
    </Container>
  );
}
