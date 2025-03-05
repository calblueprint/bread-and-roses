'use client';

// import { fetchCurrentUserFacility } from "@/api/supabase/queries/onboarding";
import { useState } from 'react';
import { Background } from '@/app/onboarding/styles';
import bnrLogo from '@/public/images/b&r-logo.png';
import { H4, P } from '@/styles/text';
import {
  BNRLogo,
  BoxContentContainer,
  InlineContainer,
  LocationDetails,
  StyledLI,
  StyledUL,
} from './styles';

export default function Status() {
  const [isApproved] = useState<boolean | null>(true);
  // const [address, setAddress] = useState<string | null>(null);
  // const [city, setCity] = useState<string | null>(null);
  // const [zip, setZip] = useState<string | null>(null);

  // useEffect(() => {
  //   async function setFacilityDetails() {
  //     const facility = await fetchCurrentUserFacility();
  //     if (!facility) {
  //       return null;
  //     }
  //     setIsApproved(facility?.is_approved);
  //     setAddress(facility?.street_address_1);
  //     setCity(facility?.city);
  //     setZip(facility?.zip);
  //   }
  //   setFacilityDetails();
  // }, []);

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

  return (
    <Background>
      <BNRLogo src={bnrLogo} alt="bnrLogo" />
      <InlineContainer>
        <BoxContentContainer>
          <H4 $fontWeight={500}>Current Status</H4>
          <LocationDetails>
            <P $fontWeight={500}>Facility Location</P>
            <P $fontWeight={400}>
              1411 E 31st St
              <br />
              Oakland, CA 94602
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
        </BoxContentContainer>
      </InlineContainer>
    </Background>
  );
}
