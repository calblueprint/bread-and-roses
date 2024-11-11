'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { UUID } from 'crypto';
import { fetchEventById, fetchEventHost } from '@/api/supabase/queries/events';
import {
  fetchFacilityByID,
  fetchFacilityContactByID,
} from '@/api/supabase/queries/facility';
import { fetchPerformer } from '@/api/supabase/queries/volunteers';
import LocPin from '@/public/images/black_loc_pin.svg';
import BPLogo from '@/public/images/bp-logo.png';
import Calendar from '@/public/images/calendar_icon.svg';
import FacilityContactPin from '@/public/images/facility_contact_icon.svg';
import HostPin from '@/public/images/host_icon.svg';
import ProducerIcon from '@/public/images/producer_icon.svg';
import PerformerPin from '@/public/images/volunteer_performer_icon.svg';
import WhiteBack from '@/public/images/white_back.svg';
import COLORS from '@/styles/colors';
import {
  Event,
  Facilities,
  FacilityContacts,
  Volunteers,
} from '@/types/schema';
import formatTime from '@/utils/formatTime';
import * as styles from './styles';

export default function EventDisplay({
  params,
}: {
  params: { event_id: UUID };
}) {
  const [event, setEvent] = useState<Event>();
  const [facility, setFacility] = useState<Facilities>();
  const [facility_contact, setFacilityContact] = useState<FacilityContacts>();
  const [host_name, setHostName] = useState<string>();
  const [host_phone_number, setHostPhoneNumber] = useState<string>();
  const [performer, setPerformer] = useState<Volunteers>();

  useEffect(() => {
    const getEvent = async () => {
      const fetchedEvent: Event = await fetchEventById(params.event_id);
      setEvent(fetchedEvent);
      const fetchedFacility: Facilities = await fetchFacilityByID(
        fetchedEvent.facility_id,
      );
      setFacility(fetchedFacility);
      const fetchedFacilityContact: FacilityContacts =
        await fetchFacilityContactByID(fetchedEvent.facility_id);
      setFacilityContact(fetchedFacilityContact);

      if (fetchedEvent.needs_host) {
        const host: Volunteers = await fetchEventHost(params.event_id);
        setHostName(`${host.first_name} ${host.last_name}`);
        setHostPhoneNumber(host.phone_number);
      } else {
        setHostName(fetchedFacility.host_name);
        setHostPhoneNumber(fetchedFacility.host_contact);
      }

      const fetchedPerformer: Volunteers = await fetchPerformer(
        params.event_id,
      );
      setPerformer(fetchedPerformer);
    };
    getEvent();
  }, [params.event_id]);

  // Render once the event is fetched
  if (!event || !facility || !facility_contact || !performer) {
    return <p></p>;
  }

  const time = formatTime(
    new Date(event.start_date_time),
    new Date(event.end_date_time),
    true,
  );
  const location = facility.street_address_1 + ', ' + facility.city;

  return (
    <styles.Page>
      <styles.ImageWrapper>
        <styles.EventImage src={BPLogo} alt="EventImage" />
        <styles.GradientOverlay />
      </styles.ImageWrapper>
      <Link href={`/events`} style={{ textDecoration: 'none' }}>
        <styles.BackImage src={WhiteBack} alt="Back icon" />
      </Link>
      <styles.Container>
        <styles.EventText $fontWeight="500" $color="#000" $align="left">
          Event Title Here
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
              {location}
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
              Notes from the facility
            </styles.ParaText>
            <styles.ParaText
              $fontWeight="400"
              $color={COLORS.gray12}
              $align="left"
            >
              Facility notes go here
            </styles.ParaText>
          </div>
          <div>
            <styles.ParaText
              $fontWeight="500"
              $color={COLORS.gray12}
              $align="left"
            >
              Notes from the producer
            </styles.ParaText>
            <styles.ParaText
              $fontWeight="400"
              $color={COLORS.gray12}
              $align="left"
            >
              {event.notes}
            </styles.ParaText>
          </div>
        </styles.AllNotesAndContactsContainer>
        <styles.AllNotesAndContactsContainer>
          <styles.SubHeadingText $fontWeight="500" $color="000" $align="left">
            Contacts
          </styles.SubHeadingText>
          <styles.ContactContainer>
            <styles.ContactPins src={FacilityContactPin} alt="House" />
            <styles.ContactDetails>
              <styles.ParaText
                $fontWeight="500"
                $color={COLORS.gray12}
                $align="left"
              >
                {facility_contact.first_name} {facility_contact.last_name}
              </styles.ParaText>
              <styles.ContactTypeText
                $fontWeight="400"
                $color={COLORS.gray10}
                $align="left"
              >
                Facility Contact
              </styles.ContactTypeText>
              <styles.PhoneNumberText
                $fontWeight="400"
                $color={COLORS.rose11}
                $align="left"
              >
                {facility_contact.phone_number}
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
                {host_name}
              </styles.ParaText>
              <styles.ContactTypeText
                $fontWeight="400"
                $color={COLORS.gray10}
                $align="left"
              >
                Event Host
              </styles.ContactTypeText>
              {/* Should this be fixed, or should it changed based on needs_host? */}
              <styles.PhoneNumberText
                $fontWeight="400"
                $color={COLORS.rose11}
                $align="left"
              >
                {host_phone_number}
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
                {performer.first_name} {performer.last_name}
              </styles.ParaText>
              <styles.ContactTypeText
                $fontWeight="400"
                $color={COLORS.gray10}
                $align="left"
              >
                Volunteer Performer
              </styles.ContactTypeText>
              {/* Should this be fixed, or should it changed based on needs_host? */}
              <styles.PhoneNumberText
                $fontWeight="400"
                $color={COLORS.rose11}
                $align="left"
              >
                {performer.phone_number}
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
              {/* Should this be fixed, or should it changed based on needs_host? */}
              <styles.PhoneNumberText
                $fontWeight="400"
                $color={COLORS.rose11}
                $align="left"
              >
                Producer Number
              </styles.PhoneNumberText>
            </styles.ContactDetails>
          </styles.ContactContainer>
        </styles.AllNotesAndContactsContainer>
      </styles.Container>
    </styles.Page>
  );
}
