import React, { useEffect, useState } from 'react';
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
            Show Preferences
          </H5>
        </styles.AvailabilityTitle>
        <styles.EditButton onClick={() => setIsEditable(!isEditable)}>
          <styles.EditIcon src={Edit} />
        </styles.EditButton>
      </styles.AvailabilityHeader>
      <styles.Content>
        <div>
          <styles.SubHeader>
            <styles.SettingDetail>
              <P $fontWeight="500" $color={COLORS.gray12} $align="left">
                Facility Type
              </P>
              <styles.SettingListedItems>
                {isEditable ? (
                  <InputDropdown
                    placeholder="Select performance type"
                    multi
                    options={facilityTypeOptions}
                    value={new Set(editPrefs.facility_type)}
                    onChange={selected =>
                      updateFacilities(Array.from(selected))
                    }
                  />
                ) : (
                  facility_preferences.map(facility => {
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
                  })
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
                    placeholder="Select performance type"
                    multi
                    options={locationOptions}
                    value={new Set(editPrefs.locations)}
                    onChange={selected => updateLocations(Array.from(selected))}
                  />
                ) : (
                  locations.map(location => {
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
                  })
                )}
              </styles.SettingListedItems>
            </styles.SettingDetail>
            <styles.SettingDetail>
              <P $fontWeight="500" $color={COLORS.gray12} $align="left">
                Preferred Audience
              </P>
              <styles.SettingListedItems>
                {isEditable ? (
                  <InputDropdown
                    placeholder="Select performance type"
                    multi
                    options={audienceOptions}
                    value={new Set(editPrefs.audience_type)}
                    onChange={selected => updateAudiences(Array.from(selected))}
                  />
                ) : (
                  audience_preferences.map(audience => {
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
                  })
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
