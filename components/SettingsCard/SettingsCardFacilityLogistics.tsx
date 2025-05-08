import React, { useState } from 'react';
import { updateFacilityInfo } from '@/api/supabase/queries/facilities';
import InputDropdown from '@/components/InputDropdown/InputDropdown';
import Edit from '@/public/images/edit.svg';
import COLORS from '@/styles/colors';
import { H5 } from '@/styles/text';
import { FacilityInfo } from '@/utils/settingsInfo';
import * as styles from './styles';
import { InputContainer, Label, RedAsterisk } from './styles';

const pianoOptions = new Set(['Yes', 'No']);
const soundOptions = new Set(['Yes', 'No']);
const parkingOptions = new Set([
  'Yes, parking lot',
  'Yes, street parking',
  'No',
]);

export default function SettingCardFacilityLogistics({
  info,
  facilityInfo,
  editInfo,
  setEditInfo,
  setFacilityInfo,
  userId,
}: {
  info: {
    parking: string;
    has_piano: boolean;
    has_sound_equipment: boolean;
  };
  editInfo: FacilityInfo;
  facilityInfo: FacilityInfo;
  setEditInfo: React.Dispatch<React.SetStateAction<FacilityInfo>>;
  setFacilityInfo: React.Dispatch<React.SetStateAction<FacilityInfo>>;
  userId: string;
}) {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const updateSound = (value: string) => {
    if (value == 'Yes') {
      setEditInfo(prev => ({
        ...prev,
        info: {
          ...prev.info,
          has_sound_equipment: true,
        },
      }));
    } else {
      setEditInfo(prev => ({
        ...prev,
        info: {
          ...prev.info,
          has_sound_equipment: false,
        },
      }));
    }
  };

  const updatePiano = (value: string) => {
    if (value == 'Yes') {
      setEditInfo(prev => ({
        ...prev,
        info: {
          ...prev.info,
          has_piano: true,
        },
      }));
    } else {
      setEditInfo(prev => ({
        ...prev,
        info: {
          ...prev.info,
          has_piano: false,
        },
      }));
    }
  };

  const updateParking = (value: string) => {
    if (value == 'Yes, street parking') {
      setEditInfo(prev => ({
        ...prev,
        info: {
          ...prev.info,
          parking: 'Street',
        },
      }));
    } else if (value == 'Yes, parking lot') {
      setEditInfo(prev => ({
        ...prev,
        info: {
          ...prev.info,
          parking: 'Parking Lot',
        },
      }));
    } else {
      setEditInfo(prev => ({
        ...prev,
        info: {
          ...prev.info,
          parking: 'None',
        },
      }));
    }
  };

  const handleCancel = () => {
    updateSound(info.has_sound_equipment ? 'Yes' : 'No');
    updatePiano(info.has_piano ? 'Yes' : 'No');
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
            Facility Logistics
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
                    Own sound equipment? <RedAsterisk>*</RedAsterisk>
                  </Label>
                  <styles.SettingListedItems>
                    <InputDropdown
                      label=""
                      placeholder="Select performance type"
                      multi={false}
                      options={soundOptions}
                      value={editInfo.info.has_sound_equipment ? 'Yes' : 'No'}
                      onChange={selected => updateSound(selected as string)}
                    />
                  </styles.SettingListedItems>
                </InputContainer>
              ) : (
                <div>
                  <Label>Own sound equipment?</Label>
                  <styles.TruncatedText
                    $fontWeight="400"
                    $color={COLORS.gray11}
                    $align="left"
                  >
                    {info.has_sound_equipment ? 'Yes' : 'No'}
                  </styles.TruncatedText>
                </div>
              )}
            </styles.SettingDetail>
            <styles.SettingDetail>
              {isEditable ? (
                <InputContainer>
                  <Label>
                    Has piano? <RedAsterisk>*</RedAsterisk>
                  </Label>
                  <styles.SettingListedItems>
                    <InputDropdown
                      label=""
                      placeholder="Select performance type"
                      multi={false}
                      options={pianoOptions}
                      value={editInfo.info.has_piano ? 'Yes' : 'No'}
                      onChange={selected => updatePiano(selected as string)}
                    />
                  </styles.SettingListedItems>
                </InputContainer>
              ) : (
                <div>
                  <Label>Has piano?</Label>
                  <styles.TruncatedText
                    $fontWeight="400"
                    $color={COLORS.gray11}
                    $align="left"
                  >
                    {info.has_piano ? 'Yes' : 'No'}
                  </styles.TruncatedText>
                </div>
              )}
            </styles.SettingDetail>
            <styles.SettingDetail>
              {isEditable ? (
                <InputContainer>
                  <Label>
                    Has parking? <RedAsterisk>*</RedAsterisk>
                  </Label>
                  <styles.SettingListedItems>
                    <InputDropdown
                      label=""
                      placeholder="Select performance type"
                      multi={false}
                      options={parkingOptions}
                      value={
                        editInfo.info.parking === 'Parking Lot'
                          ? 'Yes, parking lot'
                          : info.parking === 'Street'
                            ? 'Yes, street parking'
                            : 'None'
                      }
                      onChange={selected => updateParking(selected as string)}
                    />
                  </styles.SettingListedItems>
                </InputContainer>
              ) : (
                <div>
                  <Label>Has parking?</Label>
                  <styles.TruncatedText
                    $fontWeight="400"
                    $color={COLORS.gray11}
                    $align="left"
                  >
                    {info.parking === 'Parking Lot'
                      ? 'Yes, parking lot'
                      : info.parking === 'Street'
                        ? 'Yes, street parking'
                        : 'None'}
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
