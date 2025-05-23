'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { submitOnboardingData } from '@/api/supabase/queries/onboarding';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import Back from '@/public/images/back.svg';
import COLORS from '@/styles/colors';
import { H5, P, SMALL } from '@/styles/text';
import { OnboardingContext } from '@/utils/onboardingContext';
import {
  Background,
  Image,
  InlineContainer,
  StyledLink,
  SubmitButton,
  Title,
} from '../../styles';
import {
  BackButton,
  InfoSection,
  InfoSectionLine,
  InfoSectionTitle,
  Line,
  ReviewContainer,
  SmallText,
  StyledList,
  SubSection,
} from './styles';

export default function Review() {
  const router = useRouter();

  const onboardingContext = useContext(OnboardingContext);

  if (!onboardingContext) return null;

  const { role } = onboardingContext;
  const { preferences, generalInfo } = onboardingContext;

  const displayValue = (
    value: string | string[] | undefined,
  ): JSX.Element | string => {
    if (Array.isArray(value)) {
      return value.length > 0 ? (
        <StyledList>
          {value.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </StyledList>
      ) : (
        'N/A'
      );
    }
    return value || 'N/A';
  };

  const handleBack = () => {
    router.push('/onboarding/volunteer/additional-info');
  };

  const submitData = async () => {
    if (!generalInfo || !preferences) return;
    await submitOnboardingData(generalInfo, preferences, role);
  };

  return (
    <Background>
      <InlineContainer>
        <BackButton onClick={handleBack}>
          <Image src={Back} alt="Back icon" />
        </BackButton>
        <Title $fontWeight={500}>Did we get everything?</Title>
        <ProgressBar from={100} to={100} />
        <ReviewContainer>
          <InfoSection>
            <SubSection>
              <InfoSectionTitle>
                <div>
                  <H5 $fontWeight={500}>About</H5>
                </div>

                <div>
                  <StyledLink href="/onboarding/volunteer/basic-information">
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

            <SubSection>
              <P $fontWeight={500}>Social Media</P>
              <SmallText>{displayValue(generalInfo.socialMedia)}</SmallText>
            </SubSection>
          </InfoSection>

          <InfoSection>
            <SubSection>
              <InfoSectionTitle>
                <div>
                  <H5 $fontWeight={500}>Show Preferences</H5>
                </div>

                <div>
                  <StyledLink href="/onboarding/volunteer/show-preference">
                    <P $fontWeight={400} $color={COLORS.lilac9}>
                      edit
                    </P>
                  </StyledLink>
                </div>
              </InfoSectionTitle>
              <InfoSectionLine />
            </SubSection>

            <SubSection>
              <P $fontWeight={500}>Facility Type</P>
              <SmallText>{displayValue(preferences.facilityType)}</SmallText>
            </SubSection>

            <SubSection>
              <P $fontWeight={500}>Location Preferences</P>
              <SmallText>{displayValue(preferences.location)}</SmallText>
            </SubSection>

            <SubSection>
              <P $fontWeight={500}>Preferred Audience</P>
              <SmallText>{displayValue(preferences.audience)}</SmallText>
            </SubSection>
          </InfoSection>

          {role.isPerformer && (
            <>
              <InfoSection>
                <SubSection>
                  <InfoSectionTitle>
                    <div>
                      <H5 $fontWeight={500}>Performance Interest</H5>
                    </div>

                    <div>
                      <StyledLink href="/onboarding/volunteer/performance">
                        <P $fontWeight={400} $color={COLORS.lilac9}>
                          edit
                        </P>
                      </StyledLink>
                    </div>
                  </InfoSectionTitle>
                  <InfoSectionLine />
                </SubSection>

                <SubSection>
                  <P $fontWeight={500}>Type of Act</P>
                  <SmallText>
                    {displayValue(preferences.performanceType)}
                  </SmallText>
                </SubSection>

                <SubSection>
                  <P $fontWeight={500}>Genre</P>
                  <SmallText>{displayValue(preferences.genre)}</SmallText>
                </SubSection>

                <SubSection>
                  <P $fontWeight={500}>Group Size</P>
                  <SmallText>
                    {displayValue(preferences.performerType)}
                  </SmallText>
                </SubSection>
              </InfoSection>
              <InfoSection>
                <SubSection>
                  <InfoSectionTitle>
                    <div>
                      <H5 $fontWeight={500}>Performer Questions</H5>
                    </div>

                    <div>
                      <StyledLink href="/onboarding/volunteer/equipment">
                        <P $fontWeight={400} $color={COLORS.lilac9}>
                          edit
                        </P>
                      </StyledLink>
                    </div>
                  </InfoSectionTitle>
                  <InfoSectionLine />
                </SubSection>

                <SubSection>
                  <P $fontWeight={500}>Own sound equipment?</P>
                  <SmallText>
                    {displayValue(
                      preferences.info.performer_has_own_sound_equipment,
                    )}
                  </SmallText>
                </SubSection>

                <SubSection>
                  <P $fontWeight={500}>Need piano?</P>
                  <SmallText>
                    {displayValue(preferences.info.performer_needs_piano)}
                  </SmallText>
                </SubSection>

                <SubSection>
                  <P $fontWeight={500}>Host own show?</P>
                  <SmallText>
                    {displayValue(preferences.info.performer_can_host_self)}
                  </SmallText>
                </SubSection>
              </InfoSection>
            </>
          )}

          {role.isHost && (
            <InfoSection>
              <SubSection>
                <InfoSectionTitle>
                  <div>
                    <H5 $fontWeight={500}>Host Questions</H5>
                  </div>

                  <div>
                    <StyledLink href="/onboarding/volunteer/host-show-preference">
                      <P $fontWeight={400} $color={COLORS.lilac9}>
                        edit
                      </P>
                    </StyledLink>
                  </div>
                </InfoSectionTitle>
                <InfoSectionLine />
              </SubSection>

              <SubSection>
                <P $fontWeight={500}>
                  When days/times are you usually availabile to host?
                </P>
                <SmallText>
                  {displayValue(preferences.info.host_availability)}
                </SmallText>
              </SubSection>

              <SubSection>
                <P $fontWeight={500}>Can you pick up sound equipment?</P>
                <SmallText>
                  {displayValue(
                    preferences.info.host_willing_to_pick_up_sound_equipment,
                  )}
                </SmallText>
              </SubSection>

              <SubSection>
                <P $fontWeight={500}>Are you willing to use sound equipment?</P>
                <SmallText>
                  {displayValue(
                    preferences.info.host_willing_to_use_sound_equip,
                  )}
                </SmallText>
              </SubSection>
            </InfoSection>
          )}

          <InfoSection>
            <SubSection>
              <InfoSectionTitle>
                <div>
                  <H5 $fontWeight={500}>Accomodations</H5>
                </div>

                <div>
                  <StyledLink href="/onboarding/volunteer/additional-info">
                    <P $fontWeight={400} $color={COLORS.lilac9}>
                      edit
                    </P>
                  </StyledLink>
                </div>
              </InfoSectionTitle>
              <InfoSectionLine />
            </SubSection>

            <SubSection>
              <P $fontWeight={500}>Additional Information</P>
              <SmallText>{displayValue(preferences.additionalInfo)}</SmallText>
            </SubSection>
          </InfoSection>

          <Line />
          <SmallText>* Everything can be modified later in settings</SmallText>
        </ReviewContainer>

        <StyledLink href="/onboarding/volunteer/finalize">
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
