import React, { useState } from 'react';
import { updateFacilityInfo } from '@/api/supabase/queries/facilities';
import InputDropdown from '@/components/InputDropdown/InputDropdown';
import Edit from '@/public/images/edit.svg';
import COLORS from '@/styles/colors';
import { H5, P } from '@/styles/text';
import { FacilityInfo } from '@/utils/settingsInfo';
import { Input, InputContainer, Label, RedAsterisk } from './styles';
import * as styles from './styles';

const facilityTypeOptions = new Set([
  'Assisted Living',
  "Children's Day Care",
  'Detention Center',
  'Developmentally Disabled',
  'Food Bank',
  'Homeless Services',
  'Hospital',
  'Mental Health Services',
  'Recovery Center',
  'Senior Day Program',
  'Skilled Nursing Care',
  'Special Needs School',
  'Visually Impaired',
]);

const audienceOptions = new Set(['Youth', 'Adults', 'Senior ']);

export default function SettingCardShowPreferences({
  type,
  audience_preferences,
  facilityInfo,
  editInfo,
  setEditInfo,
  setFacilityInfo,
  userId,
}: {
  type: string;
  audience_preferences: string[];
  facilityInfo: FacilityInfo;
  editInfo: FacilityInfo;
  setFacilityInfo: React.Dispatch<React.SetStateAction<FacilityInfo>>;
  setEditInfo: React.Dispatch<React.SetStateAction<FacilityInfo>>;
  userId: string;
}) {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const updateType = (value: string) => {
    setEditInfo(prev => ({
      ...prev,
      type: value,
    }));
  };

  const updateAudiences = (value: string[]) => {
    setEditInfo(prev => ({
      ...prev,
      audience: value,
    }));
  };

  const handleCancel = () => {
    updateType(type);
    updateAudiences(audience_preferences);
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
            Facility Information
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
              <P $fontWeight="500" $color={COLORS.gray12} $align="left">
                Facility Type
              </P>
              {isEditable ? (
                <styles.SettingListedItems>
                  <InputDropdown
                    label=""
                    placeholder="Select performance type"
                    multi={false}
                    options={facilityTypeOptions}
                    value={editInfo.type}
                    onChange={selected => updateType(selected as string)}
                  />
                </styles.SettingListedItems>
              ) : (
                <div>
                  <styles.TruncatedText
                    $fontWeight="400"
                    $color={COLORS.gray11}
                    $align="left"
                  >
                    {facilityInfo.type}
                  </styles.TruncatedText>
                </div>
              )}
            </styles.SettingDetail>
            <styles.SettingDetail>
              <P $fontWeight="500" $color={COLORS.gray12} $align="left">
                Preferred Audience
              </P>
              <styles.SettingListedItems>
                {isEditable ? (
                  <InputDropdown
                    label=""
                    placeholder="Select audience type"
                    multi
                    options={audienceOptions}
                    value={new Set(editInfo.audience)}
                    onChange={selected => updateAudiences(Array.from(selected))}
                  />
                ) : (
                  <styles.NonEditableDisplay>
                    {audience_preferences.map(audience => {
                      return (
                        <li key={audience}>
                          <styles.TruncatedText
                            $fontWeight="400"
                            $color={COLORS.gray11}
                            $align="left"
                          >
                            {audience}
                          </styles.TruncatedText>
                        </li>
                      );
                    })}
                  </styles.NonEditableDisplay>
                )}
              </styles.SettingListedItems>
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
