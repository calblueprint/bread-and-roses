'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UUID } from 'crypto';
import { fetchEventById } from '@/api/supabase/queries/events';
import { fetchFacilityById } from '@/api/supabase/queries/facilities';
import {
  checkUserSignedupEvent,
  eventSignUp,
  removeVolunteerSignUp,
} from '@/api/supabase/queries/volunteers';
import Back from '@/public/images/back.svg';
import Bread from '@/public/images/bread.png';
import Calendar from '@/public/images/calendar_icon.svg';
import Clock from '@/public/images/clock.svg';
import InfoIcon from '@/public/images/info.svg';
import LocationPin from '@/public/images/location_pin.svg';
import COLORS from '@/styles/colors';
import { H5, P, SMALL } from '@/styles/text';
import { Event, Facilities } from '@/types/schema';
import { useSession } from '@/utils/AuthProvider';
import facilityTypeToPhoto from '@/utils/facilityTypeToPhoto';
import {
  Acknowledgement,
  AcknowledgementText,
  AdditionalInfoInput,
  AdditionalInfoText,
  Asterisk,
  BackButton,
  BreadImage,
  Bullet,
  CancelButton,
  Checkbox,
  ConfirmationBodyText,
  ConfirmationButton,
  ConfirmationButtonText,
  ConfirmationContainer,
  ConfirmationWrapper,
  Container,
  Curve,
  Divider,
  FacilityName,
  FacilityNotes,
  GroupSizeInput,
  GroupSizeText,
  HostInfo,
  HostList,
  HostWarningTitle,
  Icon,
  IconContainer,
  Image,
  ImageWrapper,
  IndividualTag,
  InterestBlock,
  InterestTitle,
  LeftWrapper,
  Location,
  LocationIcon,
  Page,
  RemoveConfirmation,
  RightWrapper,
  SelectAllText,
  ShowInterest,
  SignUp,
  SignUpContainer,
  TagDiv,
  TextWithIcon,
  TimeDiv,
  Title,
} from './styles';

type TimeRowProps = {
  text: string;
  src: string;
  alt: string;
};

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

  const [signedUp, setSignedUp] = useState(false);
  const [performChecked, setPerformChecked] = useState(false);
  const [hostChecked, setHostChecked] = useState(false);
  const [acknowledgeChecked, setAcknowledgeChecked] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [groupSize, setGroupSize] = useState(0);
  const [groupSizeError, setGroupSizeError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [cancelClicked, setCancelClicked] = useState(false);
  const [cancelConfirmed, setCancelConfirmed] = useState(false);
  const [performerEmails, setPerformerEmails] = useState<string[]>([]);

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

  useEffect(() => {
    const checkUserSignup = async () => {
      if (session?.user) {
        const signedUp = await checkUserSignedupEvent(
          session.user.id,
          params.event_id,
        );
        setSignedUp(signedUp);
      }
    };
    checkUserSignup();
  }, [session?.user, params.event_id]);

  const router = useRouter();

  const handleGroupSizeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    // regex for checking if input is number numbers
    if (!/^-?\d+$/.test(value) && value != '') {
      setGroupSizeError('Please enter a number');
      return;
    }

    let size = value !== '' ? parseInt(value) : 0;

    if (size > 10) {
      size = 10; //capped group size
      setGroupSizeError('Maximum group size is 10.');
    } else {
      setGroupSizeError('');
    }
    setGroupSize(size);
    setPerformerEmails(prevEmails => {
      const newEmails = [...prevEmails];
      if (size > newEmails.length) {
        return newEmails.concat(Array(size - newEmails.length).fill(''));
      } else {
        return newEmails.slice(0, size);
      }
    });
  };

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number,
  ) => {
    const newEmails = [...performerEmails];
    newEmails[index] = e.target.value;
    setPerformerEmails(newEmails);
  };

  function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const emailNotif = (
    <div>
      <HostInfo>
        <Icon src={InfoIcon} alt="InfoIcon"></Icon>
        <P $fontWeight="500" $color={COLORS.gray11}>
          {' '}
          Email Notification
        </P>
      </HostInfo>
      <HostList>
        <li>
          {' '}
          Everyone who enters their email above will receive a show confirmation
          if you get selected to perform.{' '}
        </li>
      </HostList>
    </div>
  );

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

  const onConfirmationClick = () => {
    router.push('/discover');
  };

  const time = formatDateTimeRange(event.start_date_time, event.end_date_time);

  const TimeRow = ({ text, src, alt }: TimeRowProps) => (
    <TimeDiv>
      <Icon src={src} alt={alt} />
      <P $fontWeight="400" $color={COLORS.gray12}>
        {text}
      </P>
    </TimeDiv>
  );

  const confirmation = (
    <ConfirmationWrapper>
      <ConfirmationContainer>
        <BreadImage src={Bread} alt="Bread Icon" />
        <H5 $fontWeight="500">We&apos;ll be in touch!</H5>
        <ConfirmationBodyText>
          Your interest in volunteering at {facility.name} is greatly
          appreciated! Whether you&apos;re performing or hosting, your
          contribution will help create a memorable experience for the audience.
        </ConfirmationBodyText>
        <ConfirmationBodyText>
          Your application has been received and is currently under review by
          our team. If it gets approved, we’ll follow up with next steps and
          additional details.
        </ConfirmationBodyText>

        <IconContainer>
          <TimeRow text="Event Details" src={Clock} alt="Clock" />
          <TimeRow
            text={`${facility.street_address_1}, ${facility.city}, CA`}
            src={LocationPin}
            alt="Location"
          />
          <TimeRow text={time} src={Calendar} alt="Calendar" />
        </IconContainer>

        <ConfirmationBodyText>
          In the meantime, if you have any questions, feel free to reach out to
          info@breadandroses.org.
        </ConfirmationBodyText>
        <ConfirmationBodyText>
          Thank you for making a difference!
        </ConfirmationBodyText>

        <ConfirmationButton onClick={onConfirmationClick}>
          <ConfirmationButtonText>Sounds good</ConfirmationButtonText>
        </ConfirmationButton>
      </ConfirmationContainer>
    </ConfirmationWrapper>
  );
  const finalRemoveConfirmation = (
    <ConfirmationWrapper>
      <ConfirmationContainer>
        <BreadImage src={Bread} alt="Bread Icon" />
        <H5 $fontWeight="500">You&apos;re all set!</H5>
        <ConfirmationBodyText>
          We removed you from the following event:
        </ConfirmationBodyText>

        <IconContainer>
          <TimeRow text="Event Details" src={Clock} alt="Clock" />
          <TimeRow
            text={`${facility.street_address_1}, ${facility.city}, CA`}
            src={LocationPin}
            alt="Location"
          />
          <TimeRow text={time} src={Calendar} alt="Calendar" />
        </IconContainer>

        <ConfirmationBodyText>
          Thanks for letting us know &mdash; we hope to see you at a future
          show! If you canceled by mistake, you can always sign up again.
        </ConfirmationBodyText>
        <ConfirmationButton onClick={onConfirmationClick}>
          <ConfirmationButtonText>Sounds good</ConfirmationButtonText>
        </ConfirmationButton>
      </ConfirmationContainer>
    </ConfirmationWrapper>
  );
  const removeConfirmation = (
    <RemoveConfirmation>
      You&apos;re about to remove yourself from the following event:
      <IconContainer>
        <TimeRow text={time} src={Calendar} alt="Calendar" />
        <Location $fontWeight="400" $color={COLORS.gray12}>
          {' '}
          <LocationIcon src={LocationPin} alt="Location" />
          <div>
            {' '}
            {facility.name}
            <SMALL $fontWeight="400" $color={COLORS.gray10}>
              {facility.street_address_1}, {facility.city}, CA,
              {facility.zip}
            </SMALL>
          </div>
        </Location>
      </IconContainer>
      If you&apos;re unable to attend, we understand &mdash; just confirm below.
    </RemoveConfirmation>
  );
  const signedUpText =
    'Looks like you’re one step ahead! You’ve already signed up for this event.';
  return (
    <Page>
      {!isSubmitted && !cancelConfirmed && (
        <ImageWrapper>{facilityTypeToPhoto(facility.type)}</ImageWrapper>
      )}
      <Curve />
      <Container $column={isSubmitted || cancelConfirmed}>
        {isSubmitted ? (
          confirmation
        ) : cancelConfirmed ? (
          finalRemoveConfirmation
        ) : (
          <>
            <LeftWrapper>
              <BackButton type="button" onClick={() => router.back()}>
                <Image src={Back} alt="Back icon" />
              </BackButton>
              <Title> {facility.name} </Title>
              <Divider />
              <TimeRow text={time} src={Calendar} alt="Calendar" />
              <Location $fontWeight="400" $color={COLORS.gray12}>
                {' '}
                <LocationIcon src={LocationPin} alt="Location" />
                <div>
                  {' '}
                  {facility.name}
                  <SMALL $fontWeight="400" $color={COLORS.gray10}>
                    {facility.street_address_1}, {facility.city}, CA,
                    {facility.zip}
                  </SMALL>
                </div>
              </Location>
              {event && (
                <TagDiv>
                  {event?.needs_host && (
                    <IndividualTag $bgColor={COLORS.rose6}>
                      Host Needed
                    </IndividualTag>
                  )}
                  <IndividualTag $bgColor={COLORS.bread6}>
                    {facility?.type}
                  </IndividualTag>
                  {facility?.audience.map(audience => (
                    <IndividualTag key={audience} $bgColor={COLORS.lilac3}>
                      {audience}
                    </IndividualTag>
                  ))}
                </TagDiv>
              )}
              <FacilityNotes> Facility Notes </FacilityNotes>
              <Divider />
              <FacilityName> {facility?.name} </FacilityName>
              <Bullet $fontWeight="400">
                {facility?.volunteer_notes || '(blank)'}
              </Bullet>
              <div>
                <HostWarningTitle> Bread & Roses Presents </HostWarningTitle>
                {event?.needs_host && (
                  <Bullet $fontWeight="400">
                    Host should be able to carry 15lbs of equipment
                  </Bullet>
                )}
                <Bullet $fontWeight="400">
                  {facility?.admin_added_notes || '(blank)'}
                </Bullet>
                {event?.notes && (
                  <Bullet $fontWeight="400">{event?.notes}</Bullet>
                )}
              </div>
            </LeftWrapper>
            <RightWrapper>
              <ShowInterest>
                {' '}
                {cancelClicked ? 'Are you sure?' : 'Show Interest'}{' '}
              </ShowInterest>
              <Divider />
              {signedUp ? (
                <div style={{ marginTop: '2rem' }}>
                  {cancelClicked ? (
                    removeConfirmation
                  ) : (
                    <Asterisk>{signedUpText}</Asterisk>
                  )}

                  <CancelButton
                    onClick={async () => {
                      if (!cancelClicked) {
                        setCancelClicked(true);
                      } else {
                        if (!session?.user?.id) return;
                        const success = await removeVolunteerSignUp(
                          session.user.id,
                          event.event_id,
                        );
                        if (success) {
                          setCancelConfirmed(true);
                          setSignedUp(false);
                        }
                      }
                    }}
                    style={{
                      backgroundColor: cancelClicked
                        ? COLORS.pomegranate12
                        : COLORS.pomegranate10,
                    }}
                  >
                    <ConfirmationButtonText>
                      Click to cancel
                    </ConfirmationButtonText>
                  </CancelButton>
                </div>
              ) : (
                <>
                  <SelectAllText>Select all that apply.</SelectAllText>
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
                        <Icon src={InfoIcon} alt="InfoIcon"></Icon>
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
                      {groupSizeError && <Asterisk>{groupSizeError}</Asterisk>}
                      <GroupSizeInput
                        name="sizeInfo"
                        onChange={handleGroupSizeChange}
                        maxLength={2}
                      />
                      {performerEmails.map((email, index) => (
                        <div key={index}>
                          <GroupSizeText>
                            <P $fontWeight="500" $color={COLORS.gray11}>
                              Performer Email {index + 1} &nbsp;
                            </P>
                            {index == 0 && <Asterisk>*</Asterisk>}
                          </GroupSizeText>
                          <GroupSizeInput
                            name={`performerEmail-${index}`}
                            value={email}
                            onChange={e => handleEmailChange(e, index)}
                            required={index === 0}
                          />
                        </div>
                      ))}
                      {performerEmails && emailNotif}
                    </div>
                  )}
                  <AdditionalInfoText>
                    {' '}
                    Additional Information{' '}
                  </AdditionalInfoText>
                  <AdditionalInfoInput
                    name="additionalInfo"
                    onChange={handleInfoChange}
                  />
                  <Acknowledgement>
                    <Checkbox
                      type="checkbox"
                      $checked={acknowledgeChecked}
                      onChange={() =>
                        setAcknowledgeChecked(!acknowledgeChecked)
                      }
                    />
                    <AcknowledgementText>
                      I’ve read and understood the requirements to be a
                      volunteer &nbsp;
                      <Asterisk> * </Asterisk>
                    </AcknowledgementText>
                  </Acknowledgement>
                  {errorMessage && <Asterisk>{errorMessage}</Asterisk>}
                  <SignUpContainer>
                    <SignUp
                      type="button"
                      onClick={() => {
                        if (session?.user?.id && event?.event_id) {
                          if (!performChecked && !hostChecked) {
                            console.error('No preference selected.');
                            setErrorMessage('Please select a role preference.');
                          } else {
                            if (
                              performChecked &&
                              groupSize > 0 &&
                              acknowledgeChecked
                            ) {
                              eventSignUp({
                                id: session.user.id as UUID,
                                event_id: event.event_id as UUID,
                                role: 'PERFORMER',
                                group_size: groupSize,
                                additional_info: additionalInfo,
                                performer_emails: performerEmails.filter(
                                  email => email !== '',
                                ),
                              });
                              setIsSubmitted(true);
                            }
                            if (hostChecked && acknowledgeChecked) {
                              eventSignUp({
                                id: session.user.id as UUID,
                                event_id: event.event_id as UUID,
                                role: 'HOST',
                                group_size: 0,
                                additional_info: additionalInfo,
                                performer_emails: [],
                              });
                              setIsSubmitted(true);
                            }
                            if (performChecked && groupSize === 0) {
                              setIsSubmitted(false);
                              setErrorMessage('Please indicate a group size.');
                            }
                            if (!acknowledgeChecked) {
                              setIsSubmitted(false);
                              setErrorMessage(
                                'Please acknowledge that you understand the requirements.',
                              );
                            }
                          }
                        } else {
                          console.error('Missing user ID or event ID');
                        }
                        if (
                          groupSize > 0 &&
                          !performerEmails[0] &&
                          acknowledgeChecked
                        ) {
                          setIsSubmitted(false);
                          setErrorMessage('Please enter an email.');
                        }
                        if (
                          groupSize > 0 &&
                          !isValidEmail(performerEmails[0])
                        ) {
                          setIsSubmitted(false);
                          setErrorMessage('Please enter a valid email.');
                          return;
                        }
                      }}
                    >
                      <P $fontWeight="400" $color={COLORS.gray1}>
                        Sign up
                      </P>
                    </SignUp>
                  </SignUpContainer>
                </>
              )}
            </RightWrapper>
          </>
        )}
      </Container>
    </Page>
  );
}
