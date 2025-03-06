'use client';

import { useState } from 'react';
import bnrLogo from '@/public/images/b&r-logo.png';
import COLORS from '@/styles/colors';
import { RoundedCornerButton } from '@/styles/styles';
import { H4, P, SMALL } from '@/styles/text';
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
  const [isApproved] = useState<boolean | null>(false);

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
    <Page>
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
              <RoundedCornerButton $bgColor={COLORS.pomegranate12} width="100%">
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
              <span style={{ color: COLORS.gray10 }}>
                joosymoosy@gmail.com.
              </span>
            </SMALL>
          </Email>
          {/* how are we handling logout? has it been implemented yet? */}
          <SMALL $fontWeight={400} $color={COLORS.rose11}>
            Logout?
          </SMALL>
        </UserDetails>
      </InlineContainer>
    </Page>
  );
}
