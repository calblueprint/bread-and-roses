'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { UUID } from 'crypto';
import {
  fetchEventById,
  fetchEventHostByID,
} from '@/api/supabase/queries/events';
import {
  fetchFacilityById,
  fetchFacilityContactByID,
} from '@/api/supabase/queries/facilities';
import { fetchPerformer } from '@/api/supabase/queries/volunteers';
import Back from '@/public/images/back.svg';
import LocPin from '@/public/images/black_loc_pin.svg';
import Calendar from '@/public/images/calendar_icon.svg';
import FacilityContactPin from '@/public/images/facility_contact_icon.svg';
import HostPin from '@/public/images/host_icon.svg';
import ProducerIcon from '@/public/images/producer_icon.svg';
import PerformerPin from '@/public/images/volunteer_performer_icon.svg';
import COLORS from '@/styles/colors';
import {
  Event,
  Facilities,
  FacilityContacts,
  Volunteers,
} from '@/types/schema';
import formatTime from '@/utils/formatTime';
import performanceToPhotoMap from '@/utils/performanceToPhoto';
import * as styles from './styles';

export default function EventDisplay({
  params,
}: {
  params: { event_id: UUID };
}) {
  const [event, setEvent] = useState<Event>();
  const [facility, setFacility] = useState<Facilities>();
  const [facility_contact, setFacilityContact] = useState<FacilityContacts>();
  const [host, setHost] = useState<Volunteers>();
  const [host_email, setHostEmail] = useState<string>();
  const [host_name, setHostName] = useState<string>();
  const [host_phone_number, setHostPhoneNumber] = useState<string>();
  const [performer, setPerformer] = useState<Volunteers>();

  useEffect(() => {
    const getEvent = async () => {
      const fetchedEvent: Event = await fetchEventById(params.event_id);
      setEvent(fetchedEvent);
      const fetchedFacility: Facilities = await fetchFacilityById(
        fetchedEvent.facility_id,
      );
      setFacility(fetchedFacility);
      const fetchedFacilityContact: FacilityContacts =
        await fetchFacilityContactByID(fetchedEvent.facility_id);
      setFacilityContact(fetchedFacilityContact);

      if (fetchedEvent.needs_host) {
        const host: Volunteers = await fetchEventHostByID(params.event_id);
        if (host) {
          setHost(host);
          setHostEmail(host.email);
          setHostName(`${host.first_name} ${host.last_name}`);
          setHostPhoneNumber(host.phone_number);
        }
      } else {
        setHostEmail(fetchedFacility.host_email);
        setHostName(fetchedFacility.host_name);
        setHostPhoneNumber(fetchedFacility.host_phone_number);
      }

      const fetchedPerformer: Volunteers = await fetchPerformer(
        params.event_id,
      );
      setPerformer(fetchedPerformer);
    };
    getEvent();
  }, [params.event_id]);

  // Render once the event is fetched
  if (!event || !facility) {
    return <p></p>;
  }

  const time = formatTime(
    new Date(event.start_date_time),
    new Date(event.end_date_time),
    true,
  );

  return (
    <styles.Page>
      <styles.ImageWrapper>
        {performanceToPhotoMap(
          event.performance_type,
          event.genre?.toString() ?? null,
        )}
        <styles.GradientOverlay />
      </styles.ImageWrapper>
      <styles.Curve />
      <styles.Container>
        <styles.LeftWrapper>
          <Link href={`/events`} style={{ textDecoration: 'none' }}>
            <styles.BackImage src={Back} alt="Back icon" />
          </Link>
          <styles.EventText $fontWeight="500" $color="#000" $align="left">
            {event.name}
          </styles.EventText>
          <styles.DateLocation>
            <styles.CalLocPin src={Calendar} alt="Calendar" />
            <styles.ParaText
              $fontWeight="400"
              $color={COLORS.gray12}
              $align="left"
            >
              {time}
            </styles.ParaText>
          </styles.DateLocation>
          <styles.DateLocation>
            <styles.CalLocPin src={LocPin} alt="Location" />
            <styles.LocationDetails>
              <styles.ParaText
                $fontWeight="400"
                $color={COLORS.gray12}
                $align="left"
              >
                {facility.name}
              </styles.ParaText>
              <styles.ParaText
                $fontWeight="400"
                $color={COLORS.gray10}
                $align="left"
              >
                {facility.street_address_1}, {facility.city}, CA {facility.zip}
              </styles.ParaText>
            </styles.LocationDetails>
          </styles.DateLocation>
          <styles.AllNotesAndContactsContainer>
            <styles.SubHeadingText $fontWeight="500" $color="000" $align="left">
              Notes
            </styles.SubHeadingText>
            <div>
              <styles.ParaText
                $fontWeight="500"
                $color={COLORS.gray12}
                $align="left"
              >
                Facility Notes
              </styles.ParaText>
              <styles.ParaText
                $fontWeight="400"
                $color={COLORS.gray11}
                $align="left"
              >
                {facility.volunteer_notes}
              </styles.ParaText>
            </div>
            <div>
              <styles.ParaText
                $fontWeight="500"
                $color={COLORS.gray12}
                $align="left"
              >
                Producer Notes
              </styles.ParaText>
              <styles.ParaText
                $fontWeight="400"
                $color={COLORS.gray11}
                $align="left"
              >
                {event.notes}
              </styles.ParaText>
            </div>
          </styles.AllNotesAndContactsContainer>
        </styles.LeftWrapper>
        <styles.RightWrapper>
          <styles.AllNotesAndContactsContainer>
            <styles.ContactsSubHeadingText
              $fontWeight="500"
              $color="000"
              $align="left"
            >
              Contacts
            </styles.ContactsSubHeadingText>
            <styles.ContactContainer>
              <styles.ContactPins src={FacilityContactPin} alt="House" />
              <styles.ContactDetails>
                <styles.ParaText
                  $fontWeight="500"
                  $color={COLORS.gray12}
                  $align="left"
                >
                  {facility_contact
                    ? `${facility_contact.first_name} ${facility_contact.last_name}`
                    : 'Facility Contact Not Found'}
                </styles.ParaText>
                <styles.ContactTypeText
                  $fontWeight="400"
                  $color={COLORS.gray10}
                  $align="left"
                >
                  Facility Contact
                </styles.ContactTypeText>
                <styles.EmailText
                  $fontWeight="400"
                  $color={COLORS.rose11}
                  $align="left"
                >
                  {facility_contact && facility_contact.email}
                </styles.EmailText>
                <styles.PhoneNumberText
                  $fontWeight="400"
                  $color={COLORS.rose11}
                  $align="left"
                >
                  {facility_contact && facility_contact.phone_number}
                </styles.PhoneNumberText>
              </styles.ContactDetails>
            </styles.ContactContainer>
            <styles.ContactContainer>
              <styles.ContactPins src={HostPin} alt="HandHeart" />
              <styles.ContactDetails>
                <styles.ParaText
                  $fontWeight="500"
                  $color={COLORS.gray12}
                  $align="left"
                >
                  {!event.needs_host || host ? host_name : 'Host Not Found'}
                </styles.ParaText>
                <styles.ContactTypeText
                  $fontWeight="400"
                  $color={COLORS.gray10}
                  $align="left"
                >
                  Event Host
                </styles.ContactTypeText>
                <styles.EmailText
                  $fontWeight="400"
                  $color={COLORS.rose11}
                  $align="left"
                >
                  {(!event.needs_host || host) && host_email}
                </styles.EmailText>
                <styles.PhoneNumberText
                  $fontWeight="400"
                  $color={COLORS.rose11}
                  $align="left"
                >
                  {(!event.needs_host || host) && host_phone_number}
                </styles.PhoneNumberText>
              </styles.ContactDetails>
            </styles.ContactContainer>
            <styles.ContactContainer>
              <styles.ContactPins src={PerformerPin} alt="Star" />
              <styles.ContactDetails>
                <styles.ParaText
                  $fontWeight="500"
                  $color={COLORS.gray12}
                  $align="left"
                >
                  {performer
                    ? `${performer.first_name} ${performer.last_name}`
                    : 'Performer Not Found'}
                </styles.ParaText>
                <styles.ContactTypeText
                  $fontWeight="400"
                  $color={COLORS.gray10}
                  $align="left"
                >
                  Volunteer Performer
                </styles.ContactTypeText>
                <styles.EmailText
                  $fontWeight="400"
                  $color={COLORS.rose11}
                  $align="left"
                >
                  {performer && performer.email}
                </styles.EmailText>
                <styles.PhoneNumberText
                  $fontWeight="400"
                  $color={COLORS.rose11}
                  $align="left"
                >
                  {performer && performer.phone_number}
                </styles.PhoneNumberText>
              </styles.ContactDetails>
            </styles.ContactContainer>
            <styles.ContactContainer>
              <styles.ContactPins src={ProducerIcon} alt="Board" />
              <styles.ContactDetails>
                <styles.ParaText
                  $fontWeight="500"
                  $color={COLORS.gray12}
                  $align="left"
                >
                  Producer Name
                </styles.ParaText>
                <styles.ContactTypeText
                  $fontWeight="400"
                  $color={COLORS.gray10}
                  $align="left"
                >
                  Show Producer
                </styles.ContactTypeText>
                <styles.EmailText
                  $fontWeight="400"
                  $color={COLORS.rose11}
                  $align="left"
                >
                  producer@email.com
                </styles.EmailText>
                <styles.PhoneNumberText
                  $fontWeight="400"
                  $color={COLORS.rose11}
                  $align="left"
                >
                  800-867-5309
                </styles.PhoneNumberText>
              </styles.ContactDetails>
            </styles.ContactContainer>
          </styles.AllNotesAndContactsContainer>
        </styles.RightWrapper>
      </styles.Container>
    </styles.Page>
  );
}
