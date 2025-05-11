import React, { useState } from 'react';
import { updateVolunteerPreferences } from '@/api/supabase/queries/volunteers';
import InputDropdown from '@/components/InputDropdown/InputDropdown';
import Edit from '@/public/images/edit.svg';
import COLORS from '@/styles/colors';
import { H5, P } from '@/styles/text';
import { UserPreferences } from '@/utils/settingsInfo';
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

const locationOptions = new Set([
  'Alameda',
  'Contra Costa',
  'Marin',
  'Napa',
  'San Francisco',
  'San Mateo',
  'Santa Clara',
  'Sonoma',
]);

const audienceOptions = new Set(['Youth', 'Adults', 'Senior ']);

const roleOptions = new Set(['Performer', 'Host']);

export default function SettingCardShowPreferences({
  facility_preferences,
  locations,
  audience_preferences,
  userPrefs,
  editPrefs,
  setEditPrefs,
  setUserPrefs,
  userId,
}: {
  facility_preferences: string[];
  locations: string[];
  audience_preferences: string[];
  userPrefs: UserPreferences;
  editPrefs: UserPreferences;
  setUserPrefs: React.Dispatch<React.SetStateAction<UserPreferences>>;
  setEditPrefs: React.Dispatch<React.SetStateAction<UserPreferences>>;
  userId: string;
}) {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const updateFacilities = (value: string[]) => {
    setEditPrefs(prev => ({
      ...prev,
      facility_type: value,
    }));
  };

  const updateRole = (value: string[]) => {
    setEditPrefs(prev => ({
      ...prev,
      role: value.map(item => item.toLowerCase()),
    }));
  };

  const updateLocations = (value: string[]) => {
    setEditPrefs(prev => ({
      ...prev,
      locations: value,
    }));
  };

  const updateAudiences = (value: string[]) => {
    setEditPrefs(prev => ({
      ...prev,
      audience_type: value,
    }));
  };

  const handleCancel = () => {
    updateLocations(locations);
    updateFacilities(facility_preferences);
    updateAudiences(audience_preferences);
    setIsEditable(!isEditable);
  };

  const handleSave = async () => {
    await updateVolunteerPreferences(userId, userPrefs, editPrefs);
    setUserPrefs(editPrefs);
    setIsEditable(!isEditable);
  };

  return (
    <styles.AvailabilityContainer>
      <styles.AvailabilityHeader>
        <styles.AvailabilityTitle>
          <H5 $fontWeight="500" $color={COLORS.bread1} $align="left">
            Show Preferences
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
                Role Preferences
              </P>
              <styles.SettingListedItems>
                {isEditable ? (
                  <InputDropdown
                    label=""
                    placeholder="Select roles"
                    multi
                    options={roleOptions}
                    value={
                      new Set(
                        editPrefs.role.map(
                          word => word.charAt(0).toUpperCase() + word.slice(1),
                        ),
                      )
                    }
                    onChange={selected => updateRole(Array.from(selected))}
                  />
                ) : (
                  <styles.NonEditableDisplay>
                    {userPrefs.role.map(role => {
                      return (
                        <li key={role}>
                          <styles.TruncatedText
                            $fontWeight="400"
                            $color={COLORS.gray11}
                            $align="left"
                          >
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                          </styles.TruncatedText>
                        </li>
                      );
                    })}
                  </styles.NonEditableDisplay>
                )}
              </styles.SettingListedItems>
            </styles.SettingDetail>
            <styles.SettingDetail>
              <P $fontWeight="500" $color={COLORS.gray12} $align="left">
                Facility Types
              </P>
              <styles.SettingListedItems>
                {isEditable ? (
                  <InputDropdown
                    label=""
                    placeholder="Select performance type"
                    multi
                    options={facilityTypeOptions}
                    value={new Set(editPrefs.facility_type)}
                    onChange={selected =>
                      updateFacilities(Array.from(selected))
                    }
                  />
                ) : (
                  <styles.NonEditableDisplay>
                    {facility_preferences.map(facility => {
                      return (
                        <li key={facility}>
                          <styles.TruncatedText
                            $fontWeight="400"
                            $color={COLORS.gray11}
                            $align="left"
                          >
                            {facility}
                          </styles.TruncatedText>
                        </li>
                      );
                    })}
                  </styles.NonEditableDisplay>
                )}
              </styles.SettingListedItems>
            </styles.SettingDetail>
            <styles.SettingDetail>
              <P $fontWeight="500" $color={COLORS.gray12} $align="left">
                Location Preferences
              </P>
              <styles.SettingListedItems>
                {isEditable ? (
                  <InputDropdown
                    label=""
                    placeholder="Select performance type"
                    multi
                    options={locationOptions}
                    value={new Set(editPrefs.locations)}
                    onChange={selected => updateLocations(Array.from(selected))}
                  />
                ) : (
                  <styles.NonEditableDisplay>
                    {locations.map(location => {
                      return (
                        <li key={location}>
                          <styles.TruncatedText
                            $fontWeight="400"
                            $color={COLORS.gray11}
                            $align="left"
                          >
                            {location}
                          </styles.TruncatedText>
                        </li>
                      );
                    })}
                  </styles.NonEditableDisplay>
                )}
              </styles.SettingListedItems>
            </styles.SettingDetail>
            <styles.SettingDetail>
              <P $fontWeight="500" $color={COLORS.gray12} $align="left">
                Preferred Audiences
              </P>
              <styles.SettingListedItems>
                {isEditable ? (
                  <InputDropdown
                    label=""
                    placeholder="Select performance type"
                    multi
                    options={audienceOptions}
                    value={new Set(editPrefs.audience_type)}
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
