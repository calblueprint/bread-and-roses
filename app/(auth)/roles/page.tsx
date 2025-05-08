'use client';

//temporary page
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Background,
  Button,
  ButtonContainer,
  ContinueText,
  InlineContainer,
  RoleContainer,
} from '@/app/onboarding/styles';
import ProgressBar from '@/components/ProgressBar/ProgressBar';
import RoleSelector from '@/components/RoleSelector/RoleSelector';
import FacilityRed from '@/public/images/facility_contact_red.svg';
import Facility from '@/public/images/facility_contact.svg';
import Star from '@/public/images/star.svg';
import StarRed from '@/public/images/starred.svg';
import { SelectOneText, Title } from './styles';

export interface Role {
  isFacility: boolean;
  isVolunteer: boolean;
}

export default function OnboardingPage() {
  const router = useRouter();

  const [role, setRole] = useState<Role>({
    isFacility: false,
    isVolunteer: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    setRole({
      isFacility: name === 'facility',
      isVolunteer: name === 'volunteer',
    });
  };

  const handleContinue = async () => {
    if (role.isFacility) {
      router.push('/onboarding/facility/basic-information');
    } else if (role.isVolunteer) {
      router.push('/onboarding/volunteer/role-selection');
    }
  };
  return (
    <Background>
      <InlineContainer>
        <Title $fontWeight={500}>
          What describes
          <br />
          you best?
        </Title>
        <ProgressBar from={0} to={0} />
        <RoleContainer>
          <SelectOneText>Select one.</SelectOneText>
          <label
            onClick={() => setRole({ isFacility: true, isVolunteer: false })}
            style={{ cursor: 'pointer', width: '100%' }}
          >
            <RoleSelector
              isSelected={role.isFacility}
              name="facility"
              title="Facility Contact"
              description="Represent your facility"
              shape="circle"
              iconSrc={role.isFacility ? FacilityRed : Facility}
              onChange={handleChange}
            />
          </label>
          <label
            onClick={() => setRole({ isFacility: false, isVolunteer: true })}
            style={{ cursor: 'pointer', width: '100%' }}
          >
            <RoleSelector
              isSelected={role.isVolunteer}
              name="volunteer"
              title="Event Volunteer"
              description="Host or Perform"
              shape="circle"
              iconSrc={role.isVolunteer ? StarRed : Star}
              onChange={handleChange}
            />
          </label>
        </RoleContainer>
        <ButtonContainer>
          <Button
            position="fixed"
            onClick={handleContinue}
            disabled={!role.isFacility && !role.isVolunteer}
          >
            <ContinueText>Continue</ContinueText>
          </Button>
        </ButtonContainer>
      </InlineContainer>
    </Background>
  );
}
