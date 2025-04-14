import React, { useEffect, useState } from 'react';
import { updateVolunteerPreferences } from '@/api/supabase/queries/volunteers';
import Edit from '@/public/images/edit.svg';
import COLORS from '@/styles/colors';
import { H5, P } from '@/styles/text';
import { UserPreferences } from '@/utils/settingsInfo';
import * as styles from './styles';
import { Input, InputContainer, Label, RedAsterisk } from './styles';

export default function SettingCardAccomodations({
  accomodations,
  userPrefs,
  editPrefs,
  setEditPrefs,
  setUserPrefs,
  userId,
}: {
  accomodations: string;
  userPrefs: UserPreferences;
  editPrefs: UserPreferences;
  setUserPrefs: React.Dispatch<React.SetStateAction<UserPreferences>>;
  setEditPrefs: React.Dispatch<React.SetStateAction<UserPreferences>>;
  userId: string;
}) {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const updateAccomodations = (value: string) => {
    setEditPrefs(prev => ({
      ...prev,
      additional_info: value,
    }));
  };

  const handleCancel = () => {
    updateAccomodations(accomodations);
    setIsEditable(!isEditable);
  };

  const handleSave = async () => {
    const updatedData = await updateVolunteerPreferences(
      userId,
      userPrefs,
      editPrefs,
    );
    setUserPrefs(editPrefs);
    setIsEditable(!isEditable);
  };

  return (
    <styles.AvailabilityContainer>
      <styles.AvailabilityHeader>
        <styles.AvailabilityTitle>
          <H5 $fontWeight="500" $color={COLORS.bread1} $align="left">
            Accomodations
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
                    Accomodations <RedAsterisk>*</RedAsterisk>
                  </Label>
                  <styles.TextArea
                    name="accomodations"
                    placeholder="I need help carrying equipment."
                    value={editPrefs.additional_info}
                    onChange={e => updateAccomodations(e.target.value)}
                    rows={4}
                  />
                </InputContainer>
              ) : (
                <div>
                  <Label>Accomodations</Label>
                  <styles.TruncatedText
                    $fontWeight="400"
                    $color={COLORS.gray11}
                    $align="left"
                  >
                    {accomodations}
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
