import React, { useState } from 'react';
import { updateVolunteerAdditionalInfo } from '@/api/supabase/queries/volunteers';
import InputDropdown from '@/components/InputDropdown/InputDropdown';
import Edit from '@/public/images/edit.svg';
import COLORS from '@/styles/colors';
import { H5 } from '@/styles/text';
import { UserPreferences } from '@/utils/settingsInfo';
import * as styles from './styles';
import { InputContainer, Label, SubLabel } from './styles';

const yesNoOption = new Set(['Yes', 'No']);

export default function SettingCardVolunteerRoleSpecific({
  userPrefs,
  editPrefs,
  setUserPrefs,
  setEditPrefs,
  userId,
}: {
  userPrefs: UserPreferences;
  editPrefs: UserPreferences;
  setUserPrefs: React.Dispatch<React.SetStateAction<UserPreferences>>;
  setEditPrefs: React.Dispatch<React.SetStateAction<UserPreferences>>;
  userId: string;
}) {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const updateInfo = (field: keyof typeof editPrefs.info, value: string) => {
    setEditPrefs(prev => ({
      ...prev,
      info: {
        ...prev.info,
        [field]: value,
      },
    }));
  };

  const handleCancel = () => {
    setIsEditable(!isEditable);
    setEditPrefs(userPrefs);
  };

  const handleSave = async () => {
    await updateVolunteerAdditionalInfo(userId, userPrefs.info, editPrefs.info);
    setUserPrefs(editPrefs);
    setIsEditable(!isEditable);
  };

  return (
    <styles.AvailabilityContainer>
      <styles.AvailabilityHeader>
        <styles.AvailabilityTitle>
          <H5 $fontWeight="500" $color={COLORS.bread1} $align="left">
            Additional Information
          </H5>
        </styles.AvailabilityTitle>
        <styles.EditButton onClick={() => setIsEditable(!isEditable)}>
          <styles.EditIcon src={Edit} alt="Edit" />
        </styles.EditButton>
      </styles.AvailabilityHeader>
      <styles.Content>
        {userPrefs.role.includes('performer') && (
          <styles.SubHeader>
            <styles.SettingDetail>
              {isEditable ? (
                <InputContainer>
                  <Label>Do you have your own sound equipment?</Label>
                  <styles.SettingListedItems>
                    <InputDropdown
                      label=""
                      placeholder={
                        editPrefs.info.performer_has_own_sound_equipment
                      }
                      multi={false}
                      options={yesNoOption}
                      value={editPrefs.info.performer_has_own_sound_equipment}
                      onChange={selected =>
                        updateInfo(
                          'performer_has_own_sound_equipment',
                          selected as string,
                        )
                      }
                    />
                  </styles.SettingListedItems>
                </InputContainer>
              ) : (
                <div>
                  <Label>Do you have your own sound equipment?</Label>
                  <styles.TruncatedText
                    $fontWeight="400"
                    $color={COLORS.gray11}
                    $align="left"
                  >
                    {userPrefs.info.performer_has_own_sound_equipment}
                  </styles.TruncatedText>
                </div>
              )}
            </styles.SettingDetail>
            <styles.SettingDetail>
              {isEditable ? (
                <InputContainer>
                  <Label>Can you host yourself?</Label>
                  <styles.SettingListedItems>
                    <InputDropdown
                      label=""
                      placeholder={editPrefs.info.performer_can_host_self}
                      multi={false}
                      options={yesNoOption}
                      value={editPrefs.info.performer_can_host_self}
                      onChange={selected =>
                        updateInfo(
                          'performer_can_host_self',
                          selected as string,
                        )
                      }
                    />
                  </styles.SettingListedItems>
                </InputContainer>
              ) : (
                <div>
                  <Label>Can you host yourself?</Label>
                  <styles.TruncatedText
                    $fontWeight="400"
                    $color={COLORS.gray11}
                    $align="left"
                  >
                    {userPrefs.info.performer_can_host_self}
                  </styles.TruncatedText>
                </div>
              )}
            </styles.SettingDetail>
            <styles.SettingDetail>
              {isEditable ? (
                <InputContainer>
                  <Label>Do you need a piano for your performance?</Label>
                  <styles.SettingListedItems>
                    <InputDropdown
                      label=""
                      placeholder={editPrefs.info.performer_needs_piano}
                      multi={false}
                      options={yesNoOption}
                      value={editPrefs.info.performer_needs_piano}
                      onChange={selected =>
                        updateInfo('performer_needs_piano', selected as string)
                      }
                    />
                  </styles.SettingListedItems>
                </InputContainer>
              ) : (
                <div>
                  <Label>Do you need a piano for your performance?</Label>
                  <styles.TruncatedText
                    $fontWeight="400"
                    $color={COLORS.gray11}
                    $align="left"
                  >
                    {userPrefs.info.performer_needs_piano}
                  </styles.TruncatedText>
                </div>
              )}
            </styles.SettingDetail>
          </styles.SubHeader>
        )}
        {userPrefs?.role.includes('host') && (
          <styles.SubHeader>
            <styles.SettingDetail>
              {isEditable ? (
                <InputContainer>
                  <Label>What days/times are you available as a host?</Label>
                  <styles.SettingListedItems>
                    <InputContainer>
                      <styles.TextArea
                        name="host_availability"
                        placeholder="(blank)"
                        value={editPrefs.info.host_availability}
                        onChange={e =>
                          updateInfo('host_availability', e.target.value)
                        }
                        rows={2}
                      />
                    </InputContainer>
                  </styles.SettingListedItems>
                </InputContainer>
              ) : (
                <div>
                  <Label>What days / times are you available to host?</Label>
                  <styles.TruncatedText
                    $fontWeight="400"
                    $color={COLORS.gray11}
                    $align="left"
                  >
                    {userPrefs.info.host_availability}
                  </styles.TruncatedText>
                </div>
              )}
            </styles.SettingDetail>
            <styles.SettingDetail>
              {isEditable ? (
                <InputContainer>
                  <Label>Are you willing to use sound equipment?</Label>
                  <SubLabel> (training is provided) </SubLabel>
                  <styles.SettingListedItems>
                    <InputDropdown
                      label=""
                      placeholder={
                        editPrefs.info.host_willing_to_use_sound_equip
                      }
                      multi={false}
                      options={yesNoOption}
                      value={editPrefs.info.host_willing_to_use_sound_equip}
                      onChange={selected =>
                        updateInfo(
                          'host_willing_to_use_sound_equip',
                          selected as string,
                        )
                      }
                    />
                  </styles.SettingListedItems>
                </InputContainer>
              ) : (
                <div>
                  <Label>Are you willing to use sound equipment?</Label>
                  <SubLabel> (training is provided) </SubLabel>
                  <styles.TruncatedText
                    $fontWeight="400"
                    $color={COLORS.gray11}
                    $align="left"
                  >
                    {userPrefs.info.host_willing_to_use_sound_equip}
                  </styles.TruncatedText>
                </div>
              )}
            </styles.SettingDetail>
            <styles.SettingDetail>
              {isEditable ? (
                <InputContainer>
                  <Label>
                    Are you willing to come to the Bread & Roses office to pick
                    up sound equipment?
                  </Label>
                  <styles.SettingListedItems>
                    <InputDropdown
                      label=""
                      placeholder={
                        editPrefs.info.host_willing_to_pick_up_sound_equipment
                      }
                      multi={false}
                      options={yesNoOption}
                      value={
                        editPrefs.info.host_willing_to_pick_up_sound_equipment
                      }
                      onChange={selected =>
                        updateInfo(
                          'host_willing_to_pick_up_sound_equipment',
                          selected as string,
                        )
                      }
                    />
                  </styles.SettingListedItems>
                </InputContainer>
              ) : (
                <div>
                  <Label>
                    Are you willing to come to the Bread & Roses office to pick
                    up sound equipment?
                  </Label>
                  <styles.TruncatedText
                    $fontWeight="400"
                    $color={COLORS.gray11}
                    $align="left"
                  >
                    {userPrefs.info.host_willing_to_pick_up_sound_equipment}
                  </styles.TruncatedText>
                </div>
              )}
            </styles.SettingDetail>
          </styles.SubHeader>
        )}
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
      </styles.Content>
    </styles.AvailabilityContainer>
  );
}
