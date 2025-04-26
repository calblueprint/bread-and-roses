import React, { useState } from 'react';
import { updateFacilityInfo } from '@/api/supabase/queries/facilities';
import Edit from '@/public/images/edit.svg';
import COLORS from '@/styles/colors';
import { H5 } from '@/styles/text';
import { UserInfo } from '@/utils/settingsInfo';
import * as styles from './styles';
import { Input, InputContainer, Label, RedAsterisk } from './styles';

export default function SettingCardFacilityContactDetails({
  first_name,
  last_name,
  phone,
  userInfo,
  editInfo,
  setEditInfo,
  setFacilityInfo,
  userId,
}: {
  first_name: string;
  last_name: string;
  phone: string;
  editInfo: UserInfo;
  userInfo: UserInfo;
  setEditInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  setFacilityInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  userId: string;
}) {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const updateFirstName = (value: string) => {
    setEditInfo(prev => ({
      ...prev,
      first_name: value,
    }));
  };

  const updateLastName = (value: string) => {
    setEditInfo(prev => ({
      ...prev,
      last_name: value,
    }));
  };

  const updatePhoneNumber = (value: string) => {
    setEditInfo(prev => ({
      ...prev,
      phone_number: value,
    }));
  };

  const handleCancel = () => {
    updateFirstName(first_name);
    updateLastName(last_name);
    updatePhoneNumber(phone);
    setIsEditable(!isEditable);
  };

  const handleSave = async () => {
    await updateFacilityInfo(userId, userInfo, editInfo);
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
                    First Name <RedAsterisk>*</RedAsterisk>
                  </Label>
                  <Input
                    name="first_name"
                    placeholder="Jane"
                    value={editInfo.first_name}
                    onChange={e => updateFirstName(e.target.value)}
                  />
                </InputContainer>
              ) : (
                <div>
                  <Label>First Name</Label>
                  <styles.TruncatedText
                    $fontWeight="400"
                    $color={COLORS.gray11}
                    $align="left"
                  >
                    {userInfo.first_name}
                  </styles.TruncatedText>
                </div>
              )}
            </styles.SettingDetail>
            <styles.SettingDetail>
              {isEditable ? (
                <InputContainer>
                  <Label>
                    Last Name <RedAsterisk>*</RedAsterisk>
                  </Label>
                  <Input
                    name="last_name"
                    placeholder="Doe"
                    value={editInfo.last_name}
                    onChange={e => updateLastName(e.target.value)}
                  />
                </InputContainer>
              ) : (
                <div>
                  <Label>Last Name</Label>
                  <styles.TruncatedText
                    $fontWeight="400"
                    $color={COLORS.gray11}
                    $align="left"
                  >
                    {userInfo.last_name}
                  </styles.TruncatedText>
                </div>
              )}
            </styles.SettingDetail>
            <styles.SettingDetail>
              {isEditable ? (
                <InputContainer>
                  <Label>
                    Phone Number <RedAsterisk>*</RedAsterisk>
                  </Label>
                  <Input
                    name="phone_number"
                    placeholder="(987) 654 3210"
                    value={editInfo.phone_number}
                    onChange={e => updatePhoneNumber(e.target.value)}
                  />
                </InputContainer>
              ) : (
                <div>
                  <Label>Phone Number</Label>
                  <styles.TruncatedText
                    $fontWeight="400"
                    $color={COLORS.gray11}
                    $align="left"
                  >
                    {userInfo.phone_number}
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
