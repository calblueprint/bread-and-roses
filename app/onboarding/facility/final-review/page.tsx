'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { submitFullFacilityOnboardingData } from '@/api/supabase/queries/onboarding';
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

export default function Review() {
  const router = useRouter();

  const facilityOnboardingContext = useContext(FacilityOnboardingContext);

  if (!facilityOnboardingContext) return null;

  const {
    facilityGeneralInfo: generalInfo,
    facilitySpecificInfo,
    location,
  } = facilityOnboardingContext;

  const displayValue = (value: string | string[] | undefined): string => {
    if (Array.isArray(value)) {
      return value.length > 0 ? value.join(', ') : '';
    }
    return value || '(blank)';
  };

  const handleBack = () => {
    router.push('/onboarding/facility/details');
  };

  const submitData = async () => {
    if (!generalInfo || !facilitySpecificInfo) return;
    await submitFullFacilityOnboardingData(generalInfo, facilitySpecificInfo);
  };

  return (
    <Background>
      <InlineContainer>
        <BackButton onClick={handleBack}>
          <Image src={Back} alt="Back icon" />
        </BackButton>
        <Title $fontWeight={500}>Does everything look right?</Title>
        <ProgressBar from={100} to={100} />
        <ReviewContainer>
          <InfoSection>
            <SubSection>
              <InfoSectionTitle>
                <div>
                  <H5 $fontWeight={500}>About</H5>
                </div>

                <div>
                  <StyledLink href="/onboarding/facility/about">
                    <P $fontWeight={400} $color={COLORS.lilac9}>
                      edit
                    </P>
                  </StyledLink>
                </div>
              </InfoSectionTitle>
              <InfoSectionLine />
            </SubSection>

            <SubSection>
              <P $fontWeight={500}>Facility Name</P>
              <SmallText>{displayValue(generalInfo.facilityName)}</SmallText>
            </SubSection>

            <RowContainer>
              <SubSection>
                <P $fontWeight={500}>Facility Address</P>
                <SmallText>
                  {displayValue(location.address)}
                  {location.address2?.trim() && ` ${location.address2.trim()}`}
                  {', '}
                  {displayValue(location.city)}
                  {', '}CA{', '}
                  {displayValue(location.county)}
                </SmallText>
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
                  <H5 $fontWeight={500}>Performance Area</H5>
                </div>

                <div>
                  <StyledLink href="/onboarding/facility/site-info">
                    <P $fontWeight={400} $color={COLORS.lilac9}>
                      edit
                    </P>
                  </StyledLink>
                </div>
              </InfoSectionTitle>
              <InfoSectionLine />
            </SubSection>

            <SubSection>
              <P $fontWeight={500}>Piano Available</P>
              <SmallText>
                {displayValue(facilitySpecificInfo.has_piano ? 'Yes' : 'No')}
              </SmallText>
            </SubSection>

            <SubSection>
              <P $fontWeight={500}>Sound Equipment Available</P>
              <SmallText>
                {displayValue(
                  facilitySpecificInfo.has_sound_equipment ? 'Yes' : 'No',
                )}
              </SmallText>
            </SubSection>

            <SubSection>
              <P $fontWeight={500}>Parking for Volunteers</P>
              <SmallText>
                {displayValue(facilitySpecificInfo.parking?.toString())}
              </SmallText>
            </SubSection>

            <SubSection>
              <P $fontWeight={500}>Notes for Volunteers</P>
              <SmallText>
                {displayValue(facilitySpecificInfo.volunteer_notes)}
              </SmallText>
            </SubSection>
          </InfoSection>

          <InfoSection>
            <SubSection>
              <InfoSectionTitle>
                <div>
                  <H5 $fontWeight={500}>Additional Details</H5>
                </div>

                <div>
                  <StyledLink href="/onboarding/facility/details">
                    <P $fontWeight={400} $color={COLORS.lilac9}>
                      edit
                    </P>
                  </StyledLink>
                </div>
              </InfoSectionTitle>
              <InfoSectionLine />
            </SubSection>

            <SubSection>
              <P $fontWeight={500}>Notes for Bread & Roses</P>
              <SmallText>
                {displayValue(facilitySpecificInfo.admin_notes)}
              </SmallText>
            </SubSection>
          </InfoSection>

          <Line />
          <SmallText>* Everything can be modified later in settings</SmallText>
        </ReviewContainer>

        <StyledLink href="/onboarding/facility/final-finalize">
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
