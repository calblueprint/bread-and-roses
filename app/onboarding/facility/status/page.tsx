'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '@/api/supabase/createClient';
import { fetchCurrentUserFacility } from '@/api/supabase/queries/onboarding';
import bnrLogo from '@/public/images/b&r-logo.png';
import COLORS from '@/styles/colors';
import { RoundedCornerButton } from '@/styles/styles';
import { H4, P, SMALL } from '@/styles/text';
import { useSession } from '@/utils/AuthProvider';
import {
  BNRLogo,
  BoxContentContainer,
  ContentAfterSteps,
  Email,
  InlineContainer,
  LocationDetails,
  Page,
  StyledLI,
  StyledUL,
  UserDetails,
} from './styles';

export default function Status() {
  const [isApproved, setIsApproved] = useState<boolean | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [zip, setZip] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const { signOut } = useSession();
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push('/');
  };

  const handleForward = () => {
    router.push('/onboarding/facility/about');
  };

  useEffect(() => {
    async function setFacilityDetails() {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError || !sessionData?.session?.user?.id) {
        console.error('Failed to retrieve user session.');
        setError(true);
        return null;
      }

      const facility = await fetchCurrentUserFacility(
        sessionData.session.user.id,
      );

      if (!facility) {
        console.error('Failed to retrieve facility details');
        setError(true);
        return null;
      }

      setIsApproved(facility?.is_approved);
      setAddress(facility?.street_address_1);
      setCity(facility?.city);
      setZip(facility?.zip);
      setEmail(sessionData.session.user.email ?? null);
    }
    setFacilityDetails();
    setLoading(false);
  }, []);

  interface Step {
    label: string;
    completed: boolean | null;
  }

  const steps: Step[] = [
    { label: 'Account created', completed: true },
    { label: 'Account setup', completed: true },
    { label: 'Admin approved', completed: isApproved },
  ];

  if (isApproved) {
    steps.push({ label: 'Facility Setup', completed: false });
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occurred.</p>;
  }

  return (
    <Page>
      <BNRLogo src={bnrLogo} alt="bnrLogo" />
      <InlineContainer>
        <BoxContentContainer>
          <H4 $fontWeight={500}>Current Status</H4>
          <LocationDetails>
            <P $fontWeight={500}>Facility Location</P>
            <P $fontWeight={400}>
              {address}
              <br />
              {city}, CA {zip}
            </P>
          </LocationDetails>
          <StyledUL>
            {steps.map((item, index) => (
              <StyledLI
                key={index}
                $completed={item.completed ? 'true' : 'false'}
              >
                {item.label}
              </StyledLI>
            ))}
          </StyledUL>
          {!isApproved && (
            <P $fontWeight={400}>
              We’ve received your facility application, a Bread & Roses staff
              will reach out to you soon!
            </P>
          )}
          {isApproved && (
            <ContentAfterSteps>
              <P $fontWeight={400} $color={COLORS.gray12}>
                We couldn’t find your facility records, please fill out your
                facility information. If you think this is a mistake, please
                contact{' '}
                <span style={{ color: COLORS.rose11 }}>
                  info@breadandroses.org.
                </span>
              </P>
              <RoundedCornerButton
                $bgColor={COLORS.pomegranate12}
                width="100%"
                onClick={handleForward}
              >
                <P $fontWeight={400} $color={COLORS.gray1}>
                  Begin Setup
                </P>
              </RoundedCornerButton>
            </ContentAfterSteps>
          )}
        </BoxContentContainer>
        <UserDetails>
          <Email>
            <SMALL $fontWeight={400}>
              You are currently logged in as{' '}
              <span style={{ color: COLORS.gray10 }}>{email}.</span>
            </SMALL>
          </Email>
          <SMALL
            $fontWeight={400}
            $color={COLORS.rose11}
            onClick={handleSignOut}
            style={{ cursor: 'pointer' }}
          >
            Logout?
          </SMALL>
        </UserDetails>
      </InlineContainer>
    </Page>
  );
}
