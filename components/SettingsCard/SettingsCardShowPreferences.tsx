import React from 'react';
import Edit from '@/public/images/edit.svg';
import COLORS from '@/styles/colors';
import { H5, P, UL } from '@/styles/text';
import * as styles from './styles';

export default function SettingCardShowPreferences() {
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
              <UL>
                <li>
                  <styles.TruncatedText
                    $fontWeight="400"
                    $color={COLORS.gray11}
                    $align="left"
                    $paddingLeft="1.25rem"
                  >
                    Hospitals
                  </styles.TruncatedText>
                </li>
                <li>
                  <styles.TruncatedText
                    $fontWeight="400"
                     $color={COLORS.gray11}
                     $align="left"
                   >
                     Senior Homes
                   </styles.TruncatedText>
                 </li>
              </UL>
            </styles.SettingDetail>
            <styles.SettingDetail>
              <P $fontWeight="500" $color={COLORS.gray12} $align="left">
                Location Preferences
              </P>
              <UL>
                <li>
                  <styles.TruncatedText
                    $fontWeight="400"
                    $color={COLORS.gray11}
                    $align="left"
                  >
                    Oakland, CA
                  </styles.TruncatedText>
                </li>
              </UL>
            </styles.SettingDetail>
            <styles.SettingDetail>
              <P $fontWeight="500" $color={COLORS.gray12} $align="left">
                Preferred Audience
              </P>
              <UL>
                <li>
                  <styles.TruncatedText
                    $fontWeight="400"
                    $color={COLORS.gray11}
                    $align="left"
                  >
                    Seniors
                  </styles.TruncatedText>
                </li>
              </UL>
            </styles.SettingDetail>
          </styles.SubHeader>
        </div>
      </styles.Content>
    </styles.AvailabilityContainer>
  );
}
