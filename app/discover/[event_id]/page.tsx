'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UUID } from 'crypto';
import { fetchEventById } from '@/api/supabase/queries/events';
import { fetchFacilityById } from '@/api/supabase/queries/facilities';
import { eventSignUp } from '@/api/supabase/queries/volunteers';
import Back from '@/public/images/back.svg';
import Calendar from '@/public/images/calendar_icon.svg';
import InfoIcon from '@/public/images/info.svg';
import LocationPin from '@/public/images/location_pin.svg';
import COLORS from '@/styles/colors';
import { P, SMALL } from '@/styles/text';
import { Event, Facilities } from '@/types/schema';
import { useSession } from '@/utils/AuthProvider';
import {
  Acknowledgement,
  AcknowledgementText,
  AdditionalInfoInput,
  AdditionalInfoText,
  Asterisk,
  BackButton,
  Body,
  Bullet,
  CalendarIcon,
  Checkbox,
  Container,
  Divider,
  FacilityName,
  GroupSizeInput,
  GroupSizeText,
  HostInfo,
  HostList,
  HostWarningTitle,
  Image,
  IndividualTag,
  InterestBlock,
  InterestTitle,
  Location,
  LocationIcon,
  Preferences,
  ShowInterest,
  SignUp,
  SignUpContainer,
  TagDiv,
  TextWithIcon,
  TimeDiv,
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
    <InterestBlock $checked={checked} onClick={onChange}>
      {' '}
      <Checkbox type="checkbox" $checked={checked} />
      <TextWithIcon>
        <div>
          <InterestTitle $fontWeight="500"> {title}</InterestTitle>
          <SMALL $fontWeight="400" $color="#515151">
            {' '}
            {about}{' '}
          </SMALL>
        </div>
        <Image
          $checked={checked}
          src={icon}
          alt="Icon"
          width={0}
          height={0}
        ></Image>
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
  const [acknowledgeChecked, setAcknowledgeChecked] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [groupSize, setGroupSize] = useState(0);
  const [groupSizeError, setGroupSizeError] = useState(false);

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

  const handleGroupSizeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    // regex for checking if input is number numbers
    if (!/^-?\d+$/.test(value) && value != '') {
      setGroupSizeError(true);
      return;
    }

    const size = parseInt(value);
    setGroupSize(size);
    setGroupSizeError(false);
  };

  if (!event || !facility) {
    return <p />;
  }

  const handleInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setAdditionalInfo(value);
  };

  if (!event || !facility) {
    return <p />;
  }

  function formatDateTimeRange(startTimestamp: string, endTimestamp: string) {
    const startDate = new Date(startTimestamp);
    const endDate = new Date(endTimestamp);

    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
    };
    const dateStr: string = new Intl.DateTimeFormat('en-US', options).format(
      startDate,
    );

    const startHour: number = startDate.getHours() % 12 || 12;
    const endHour: number = endDate.getHours() % 12 || 12;
    const period: string = startDate.getHours() >= 12 ? 'PM' : 'AM';

    return `${dateStr}, ${startHour}-${endHour} ${period}`;
  }

  const time = formatDateTimeRange(event.start_date_time, event.end_date_time);

  return (
    <Container>
      <BackButton type="button" onClick={() => router.back()}>
        <Image src={Back} alt="Back icon" />
      </BackButton>
      <Body>
        <Title> {event?.name} </Title>
        <Divider />
        <TimeDiv>
          <CalendarIcon src={Calendar} alt="Calendar" />
          <P $fontWeight="400" $color={COLORS.gray12}>
            {time}
          </P>
        </TimeDiv>
        <Location $fontWeight="400" $color={COLORS.gray12}>
          {' '}
          <LocationIcon src={LocationPin} alt="Location" />
          <div>
            {facility?.name}
            <SMALL $fontWeight="400" $color={COLORS.gray10}>
              {facility?.street_address_1}, {facility?.city}, CA,
              {facility?.zip}
            </SMALL>
          </div>
        </Location>
        {event && (
          <TagDiv>
            {event?.needs_host && (
              <IndividualTag $bgColor={COLORS.rose6}>Host Needed</IndividualTag>
            )}
            <IndividualTag $bgColor={COLORS.bread6}>
              {event?.performance_type}
            </IndividualTag>
            {event?.genre && (
              <IndividualTag $bgColor={COLORS.lilac3}>
                {event?.genre}
              </IndividualTag>
            )}
          </TagDiv>
        )}
        <Preferences> Preferences </Preferences>
        <Divider />
        <FacilityName> {facility?.name} </FacilityName>
        <Bullet $fontWeight="400">Prefers {event?.performance_type}</Bullet>
        {event?.genre && (
          <Bullet $fontWeight="400"> Prefers {event?.genre} </Bullet>
        )}
        {event?.needs_host ? (
          <div>
            <HostWarningTitle> Bread & Roses Presents </HostWarningTitle>
            <Bullet $fontWeight="400">
              Host should be able to carry 15lbs of equipment
            </Bullet>
          </div>
        ) : (
          ''
        )}
        <ShowInterest> Show Interest </ShowInterest>
        <Divider />
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
        {hostChecked && (
          <div>
            <HostInfo>
              <CalendarIcon src={InfoIcon} alt="InfoIcon"></CalendarIcon>{' '}
              <P $fontWeight="500" $color={COLORS.gray11}>
                {' '}
                Responsibilities of a Host
              </P>
            </HostInfo>
            <HostList>
              <li> Track audience demographic statistics </li>
              <li> If needed, help performer carry equipment </li>
              <li> Manage show logistics </li>
            </HostList>
          </div>
        )}
        {performChecked && (
          <div>
            <GroupSizeText>
              <P $fontWeight="500" $color={COLORS.gray11}>
                Group Size &nbsp;
              </P>
              <Asterisk> *</Asterisk>
            </GroupSizeText>
            {groupSizeError && <Asterisk> Please enter a number. </Asterisk>}
            <GroupSizeInput name="sizeInfo" onChange={handleGroupSizeChange} />
          </div>
        )}
        <AdditionalInfoText> Additional Info </AdditionalInfoText>
        <AdditionalInfoInput
          name="additionalInfo"
          onChange={handleInfoChange}
        />
        <Acknowledgement>
          <Checkbox
            type="checkbox"
            $checked={acknowledgeChecked}
            onChange={() => setAcknowledgeChecked(!acknowledgeChecked)}
          />
          <AcknowledgementText>
            I’ve read and understood the requirements to be a volunteer &nbsp;
            <Asterisk> * </Asterisk>
          </AcknowledgementText>
        </Acknowledgement>
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
                    group_size: groupSize,
                    additional_info: additionalInfo,
                  });
                }
                if (hostChecked) {
                  eventSignUp({
                    id: session.user.id as UUID,
                    event_id: event.event_id as UUID,
                    role: 'HOST',
                    group_size: 0,
                    additional_info: additionalInfo,
                  });
                }
              } else {
                console.error('Missing user ID or event ID');
              }
            }}
          >
            <P $fontWeight="400" $color={COLORS.gray1}>
              Sign up
            </P>
          </SignUp>
        </SignUpContainer>
      </Body>
    </Container>
  );
}
