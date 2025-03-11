import React from 'react';
import Edit from '@/public/images/edit.svg';
import COLORS from '@/styles/colors';
import { H5, P } from '@/styles/text';
import * as styles from './styles';

export default function SettingCardShowPreferences({
  facility_preferences,
  locations,
  audience_preferences,
}: {
  facility_preferences: string[];
  locations: string[];
  audience_preferences: string[];
}) {
  return (
    <styles.AvailabilityContainer>
      <styles.AvailabilityHeader>
        <styles.AvailabilityTitle>
          <H5 $fontWeight="500" $color={COLORS.bread1} $align="left">
            Show Preferences
          </H5>
        </styles.AvailabilityTitle>
        <styles.Edit src={Edit} alt="Edit" />
      </styles.AvailabilityHeader>
      <styles.Content>
        <div>
          <styles.SubHeader>
            <styles.SettingDetail>
              <P $fontWeight="500" $color={COLORS.gray12} $align="left">
                Facility Type
              </P>
              <styles.SettingListedItems>
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
              </styles.SettingListedItems>
            </styles.SettingDetail>
            <styles.SettingDetail>
              <P $fontWeight="500" $color={COLORS.gray12} $align="left">
                Location Preferences
              </P>
              <styles.SettingListedItems>
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
              </styles.SettingListedItems>
            </styles.SettingDetail>
            <styles.SettingDetail>
              <P $fontWeight="500" $color={COLORS.gray12} $align="left">
                Preferred Audience
              </P>
              <styles.SettingListedItems>
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
              </styles.SettingListedItems>
            </styles.SettingDetail>
          </styles.SubHeader>
        </div>
      </styles.Content>
    </styles.AvailabilityContainer>
  );
}
