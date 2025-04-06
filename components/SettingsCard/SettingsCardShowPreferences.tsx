import React, { useEffect, useState } from 'react';
import InputDropdown from '@/components/InputDropdown/InputDropdown';
import Edit from '@/public/images/edit.svg';
import COLORS from '@/styles/colors';
import { H5, P } from '@/styles/text';
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
}: {
  facility_preferences: string[];
  locations: string[];
  audience_preferences: string[];
}) {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [facilitiesArray, setFacilitiesArray] =
    useState<string[]>(facility_preferences);
  const [audienceArray, setAudienceArray] =
    useState<string[]>(audience_preferences);
  const [locationsArray, setLocationsArray] = useState<string[]>(locations);

  const handleCancel = () => {
    setLocationsArray(locations);
    setFacilitiesArray(facility_preferences);
    setAudienceArray(audience_preferences);
    setIsEditable(!isEditable);
  };

  const handleSave = () => {
    locations = locationsArray;
    facility_preferences = facilitiesArray;
    audience_preferences = audienceArray;
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
                    value={new Set(facilitiesArray)}
                    onChange={selected =>
                      setFacilitiesArray(Array.from(selected))
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
                    value={new Set(locationsArray)}
                    onChange={selected =>
                      setLocationsArray(Array.from(selected))
                    }
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
                    value={new Set(audienceArray)}
                    onChange={selected =>
                      setAudienceArray(Array.from(selected))
                    }
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
            <div>
              <button onClick={handleSave}>save</button>
              <button onClick={handleCancel}>cancel</button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </styles.Content>
    </styles.AvailabilityContainer>
  );
}
