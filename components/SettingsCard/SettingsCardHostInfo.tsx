import React, { useState } from 'react';
import {
  fetchFacilityInfo,
  updateFacilityInfo,
} from '@/api/supabase/queries/facilities';
import Edit from '@/public/images/edit.svg';
import COLORS from '@/styles/colors';
import { H5 } from '@/styles/text';
import { FacilityInfo } from '@/utils/settingsInfo';
import * as styles from './styles';
import { Input, InputContainer, Label, RedAsterisk } from './styles';

export default function SettingCardHostInfo({
  hasHost,
  hostName,
  hostEmail,
  hostPhone,
  facilityInfo,
  editInfo,
  setEditInfo,
  setFacilityInfo,
  userId,
}: {
  hasHost: boolean;
  hostName: string;
  hostEmail: string;
  hostPhone: string;
  editInfo: FacilityInfo;
  facilityInfo: FacilityInfo;
  setEditInfo: React.Dispatch<React.SetStateAction<FacilityInfo>>;
  setFacilityInfo: React.Dispatch<React.SetStateAction<FacilityInfo>>;
  userId: string;
}) {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const updateHostName = (value: string) => {
    setEditInfo(prev => ({
      ...prev,
      host_name: value,
      has_host: true,
    }));
  };

  const updateHostEmail = (value: string) => {
    setEditInfo(prev => ({
      ...prev,
      host_email: value,
      has_host: true,
    }));
  };

  const updateHostPhone = (value: string) => {
    setEditInfo(prev => ({
      ...prev,
      host_phone_number: value,
      has_host: true,
    }));
  };

  const handleCancel = () => {
    updateHostName(hostName);
    updateHostEmail(hostEmail);
    updateHostPhone(hostPhone);
    setIsEditable(!isEditable);
  };

  const handleSave = async () => {
    await updateFacilityInfo(userId, facilityInfo, editInfo);
    setFacilityInfo(editInfo);
    setIsEditable(!isEditable);
  };

  const handleRemoveHost = async () => {
    const clearedHostInfo = {
      ...editInfo,
      host_name: '',
      host_email: '',
      host_phone_number: '',
      has_host: false,
    };

    //setEditInfo(clearedHostInfo);
    await updateFacilityInfo(userId, facilityInfo, clearedHostInfo);

    const updatedFacilityInfo = await fetchFacilityInfo(userId);
    setFacilityInfo(updatedFacilityInfo);
    setEditInfo(updatedFacilityInfo);
    //setIsEditable(!isEditable);
  };
  return (
    <styles.AvailabilityContainer>
      <styles.AvailabilityHeader>
        <styles.AvailabilityTitle>
          <H5 $fontWeight="500" $color={COLORS.bread1} $align="left">
            Host Information
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
                    Host Name <RedAsterisk>*</RedAsterisk>
                  </Label>
                  <Input
                    name="name"
                    placeholder="Terry Smith"
                    value={editInfo.host_name}
                    onChange={e => updateHostName(e.target.value)}
                  />
                </InputContainer>
              ) : (
                <div>
                  {facilityInfo.has_host ? (
                    <styles.RemoveHostContainer>
                      <div>
                        <Label>Host Name</Label>
                        <styles.TruncatedText
                          $fontWeight="400"
                          $color={COLORS.gray11}
                          $align="left"
                        >
                          {facilityInfo.host_name
                            ? facilityInfo.host_name
                            : 'n/a'}
                        </styles.TruncatedText>
                      </div>
                      <styles.RemoveHostButton onClick={handleRemoveHost}>
                        Remove
                      </styles.RemoveHostButton>
                    </styles.RemoveHostContainer>
                  ) : (
                    <div>
                      <Label>Host Name</Label>
                      <styles.TruncatedText
                        $fontWeight="400"
                        $color={COLORS.gray11}
                        $align="left"
                      >
                        {facilityInfo.host_name
                          ? facilityInfo.host_name
                          : 'n/a'}
                      </styles.TruncatedText>
                    </div>
                  )}
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
                    placeholder="(123) 465 7890"
                    value={editInfo.host_phone_number}
                    onChange={e => updateHostPhone(e.target.value)}
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
                    {facilityInfo.host_phone_number
                      ? facilityInfo.host_phone_number
                      : 'n/a'}
                  </styles.TruncatedText>
                </div>
              )}
            </styles.SettingDetail>
            <styles.SettingDetail>
              {isEditable ? (
                <InputContainer>
                  <Label>
                    Email <RedAsterisk>*</RedAsterisk>
                  </Label>
                  <Input
                    name="email"
                    placeholder="jane.doe@email.com"
                    value={editInfo.host_email}
                    onChange={e => updateHostEmail(e.target.value)}
                  />
                </InputContainer>
              ) : (
                <div>
                  <Label>Email</Label>
                  <styles.TruncatedText
                    $fontWeight="400"
                    $color={COLORS.gray11}
                    $align="left"
                  >
                    {facilityInfo.host_email ? facilityInfo.host_email : 'n/a'}
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
