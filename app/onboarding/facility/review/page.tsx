'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { submitFacilityOnboardingData } from '@/api/supabase/queries/onboarding';
import {
  Background,
  Image,
  InlineContainer,
  StyledLink,
  SubmitButton,
  Title,
} from '@/app/onboarding/styles';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import Back from '@/public/images/back.svg';
import COLORS from '@/styles/colors';
import { H5, P, SMALL } from '@/styles/text';
import { withRequireAuth } from '@/utils/AuthProvider';
import { FacilityOnboardingContext } from '@/utils/facilityOnboardingContext';
import {
  BackButton,
  InfoSection,
  InfoSectionLine,
  InfoSectionTitle,
  Line,
  ReviewContainer,
  RowContainer,
  SmallText,
  SubSection,
} from './styles';

function Review() {
  const router = useRouter();

  const facilityOnboardingContext = useContext(FacilityOnboardingContext);

  if (!facilityOnboardingContext) return null;

  const { facilityGeneralInfo: generalInfo, location } =
    facilityOnboardingContext;

  const displayValue = (value: string | string[] | undefined): string => {
    if (Array.isArray(value)) {
      return value.length > 0 ? value.join(', ') : 'N/A';
    }
    return value || 'N/A';
  };

  const handleBack = () => {
    router.push('/onboarding/facility/location');
  };

  const submitData = async () => {
    if (!generalInfo || !location) return;
    await submitFacilityOnboardingData(generalInfo, location);
  };

  return (
    <Background>
      <InlineContainer>
        <BackButton onClick={handleBack}>
          <Image src={Back} alt="Back icon" />
        </BackButton>
        <Title $fontWeight={500}>Does everything look right?</Title>
        <ProgressBar from={66} to={100} />
        <ReviewContainer>
          <InfoSection>
            <SubSection>
              <InfoSectionTitle>
                <div>
                  <H5 $fontWeight={500}>Facility Location</H5>
                </div>

                <div>
                  <StyledLink href="/onboarding/facility/location">
                    <P $fontWeight={400} $color={COLORS.lilac9}>
                      edit
                    </P>
                  </StyledLink>
                </div>
              </InfoSectionTitle>
              <InfoSectionLine />
            </SubSection>

            <SubSection>
              <P $fontWeight={500}>Street Address</P>
              <SmallText>{displayValue(location.address)}</SmallText>
            </SubSection>

            <RowContainer>
              <SubSection>
                <P $fontWeight={500}>City</P>
                <SmallText>{displayValue(location.city)}</SmallText>
              </SubSection>

              <SubSection>
                <P $fontWeight={500}>County</P>
                <SmallText>{displayValue(location.county)}</SmallText>
              </SubSection>
            </RowContainer>

            <SubSection>
              <P $fontWeight={500}>Zip Code</P>
              <SmallText>{displayValue(location.zipCode)}</SmallText>
            </SubSection>
          </InfoSection>

          <InfoSection>
            <SubSection>
              <InfoSectionTitle>
                <div>
                  <H5 $fontWeight={500}>About</H5>
                </div>

                <div>
                  <StyledLink href="/onboarding/facility/basic-information">
                    <P $fontWeight={400} $color={COLORS.lilac9}>
                      edit
                    </P>
                  </StyledLink>
                </div>
              </InfoSectionTitle>
              <InfoSectionLine />
            </SubSection>

            <SubSection>
              <P $fontWeight={500}>First Name</P>
              <SmallText>{displayValue(generalInfo.firstName)}</SmallText>
            </SubSection>

            <SubSection>
              <P $fontWeight={500}>Last Name</P>
              <SmallText>{displayValue(generalInfo.lastName)}</SmallText>
            </SubSection>

            <SubSection>
              <P $fontWeight={500}>Phone Number</P>
              <SmallText>{displayValue(generalInfo.phoneNumber)}</SmallText>
            </SubSection>
          </InfoSection>

          <Line />
          <SmallText>* Everything can be modified later in settings</SmallText>
        </ReviewContainer>

        <StyledLink href="/onboarding/facility/finalize">
          <SubmitButton onClick={submitData}>
            <SMALL $fontWeight="400" $color="white">
              Everything looks good!
            </SMALL>
          </SubmitButton>
        </StyledLink>
      </InlineContainer>
    </Background>
  );
}

export default withRequireAuth(Review);
