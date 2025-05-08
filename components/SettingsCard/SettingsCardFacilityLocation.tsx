import React, { useState } from 'react';
import { updateFacilityInfo } from '@/api/supabase/queries/facilities';
import Edit from '@/public/images/edit.svg';
import COLORS from '@/styles/colors';
import { H5 } from '@/styles/text';
import { FacilityInfo } from '@/utils/settingsInfo';
import * as styles from './styles';
import { Input, InputContainer, Label, RedAsterisk } from './styles';

export default function SettingCardFacilityLocation({
  name,
  city,
  county,
  street_address_1,
  street_address_2,
  facilityInfo,
  editInfo,
  setEditInfo,
  setFacilityInfo,
  userId,
}: {
  name: string;
  city: string;
  county: string;
  street_address_1: string;
  street_address_2: string;
  editInfo: FacilityInfo;
  facilityInfo: FacilityInfo;
  setEditInfo: React.Dispatch<React.SetStateAction<FacilityInfo>>;
  setFacilityInfo: React.Dispatch<React.SetStateAction<FacilityInfo>>;
  userId: string;
}) {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const updateName = (value: string) => {
    setEditInfo(prev => ({
      ...prev,
      name: value,
    }));
  };

  const updateCity = (value: string) => {
    setEditInfo(prev => ({
      ...prev,
      city: value,
    }));
  };

  const updateCounty = (value: string) => {
    setEditInfo(prev => ({
      ...prev,
      county: value,
    }));
  };

  const updateAddress1 = (value: string) => {
    setEditInfo(prev => ({
      ...prev,
      street_address_1: value,
    }));
  };

  const updateAddress2 = (value: string) => {
    setEditInfo(prev => ({
      ...prev,
      street_address_2: value,
    }));
  };

  const handleCancel = () => {
    updateName(name);
    updateCity(city);
    updateCounty(county);
    updateAddress1(street_address_1);
    updateAddress2(street_address_2);
    setIsEditable(!isEditable);
  };

  const handleSave = async () => {
    await updateFacilityInfo(userId, facilityInfo, editInfo);
    setFacilityInfo(editInfo);
    setIsEditable(!isEditable);
  };

  return (
    <styles.AvailabilityContainer>
      <styles.AvailabilityHeader>
        <styles.AvailabilityTitle>
          <H5 $fontWeight="500" $color={COLORS.bread1} $align="left">
            Facility Location
          </H5>
        </styles.AvailabilityTitle>
        <styles.EditButton onClick={() => setIsEditable(!isEditable)}>
          <styles.EditIcon src={Edit} alt="Edit" />
        </styles.EditButton>
      </styles.AvailabilityHeader>
      <styles.Content>
        <div>
          <styles.SubHeader>
            <styles.SettingDetail>
              {isEditable ? (
                <InputContainer>
                  <Label>
                    Facility Name <RedAsterisk>*</RedAsterisk>
                  </Label>
                  <Input
                    name="name"
                    placeholder="Highland Hospital"
                    value={editInfo.name}
                    onChange={e => updateName(e.target.value)}
                  />
                </InputContainer>
              ) : (
                <div>
                  <Label>Facility Name</Label>
                  <styles.TruncatedText
                    $fontWeight="400"
                    $color={COLORS.gray11}
                    $align="left"
                  >
                    {facilityInfo.name}
                  </styles.TruncatedText>
                </div>
              )}
            </styles.SettingDetail>
            <styles.SettingDetail>
              {isEditable ? (
                <InputContainer>
                  <Label>
                    Address <RedAsterisk>*</RedAsterisk>
                  </Label>
                  <Input
                    name="address"
                    placeholder="2400 Durant Ave."
                    value={editInfo.street_address_1}
                    onChange={e => updateAddress1(e.target.value)}
                  />
                </InputContainer>
              ) : (
                <div>
                  <Label>Address</Label>
                  <styles.TruncatedText
                    $fontWeight="400"
                    $color={COLORS.gray11}
                    $align="left"
                  >
                    {facilityInfo.street_address_1}
                  </styles.TruncatedText>
                  {facilityInfo.street_address_2 != null && (
                    <styles.TruncatedText
                      $fontWeight="400"
                      $color={COLORS.gray11}
                      $align="left"
                    >
                      {facilityInfo.street_address_2}
                    </styles.TruncatedText>
                  )}
                </div>
              )}
            </styles.SettingDetail>
            {isEditable && (
              <styles.SettingDetail>
                <InputContainer>
                  <Label>Apartment, suite, etc (optional)</Label>
                  <Input
                    name="address2"
                    placeholder="Unit 208"
                    value={editInfo.street_address_2}
                    onChange={e => updateAddress2(e.target.value)}
                  />
                </InputContainer>
              </styles.SettingDetail>
            )}
            <styles.SettingDetail>
              {isEditable ? (
                <InputContainer>
                  <Label>
                    City <RedAsterisk>*</RedAsterisk>
                  </Label>
                  <Input
                    name="city"
                    placeholder="Berkeley"
                    value={editInfo.city}
                    onChange={e => updateCity(e.target.value)}
                  />
                </InputContainer>
              ) : (
                <div>
                  <Label>City</Label>
                  <styles.TruncatedText
                    $fontWeight="400"
                    $color={COLORS.gray11}
                    $align="left"
                  >
                    {facilityInfo.city}
                  </styles.TruncatedText>
                </div>
              )}
            </styles.SettingDetail>
            <styles.SettingDetail>
              {isEditable ? (
                <InputContainer>
                  <Label>
                    County <RedAsterisk>*</RedAsterisk>
                  </Label>
                  <Input
                    name="county"
                    placeholder="Alameda"
                    value={editInfo.county}
                    onChange={e => updateCounty(e.target.value)}
                  />
                </InputContainer>
              ) : (
                <div>
                  <Label>County</Label>
                  <styles.TruncatedText
                    $fontWeight="400"
                    $color={COLORS.gray11}
                    $align="left"
                  >
                    {facilityInfo.county}
                  </styles.TruncatedText>
                </div>
              )}
            </styles.SettingDetail>
          </styles.SubHeader>
          {isEditable ? (
            <styles.ButtonContainer>
              <styles.CancelButton onClick={handleCancel}>
                Cancel
              </styles.CancelButton>
              <styles.SaveButton onClick={handleSave}>Save</styles.SaveButton>
            </styles.ButtonContainer>
          ) : (
            <div></div>
          )}
        </div>
      </styles.Content>
    </styles.AvailabilityContainer>
  );
}
