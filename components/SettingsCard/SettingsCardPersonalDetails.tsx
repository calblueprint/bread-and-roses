import React from 'react';
import Edit from '@/public/images/edit.svg';
import COLORS from '@/styles/colors';
import { H5, P } from '@/styles/text';
import * as styles from './styles';

export default function SettingCardPersonalDetails() {
  return (
    <styles.AvailabilityContainer>
      <styles.AvailabilityHeader>
        <styles.AvailabilityTitle>
          <H5 $fontWeight="500" $color={COLORS.bread1} $align="left">
            Personal Details
          </H5>
        </styles.AvailabilityTitle>
        <styles.Edit src={Edit} alt="Edit" />
      </styles.AvailabilityHeader>
      <styles.Content>
        <div>
          <styles.SubHeader>
            <styles.SettingDetail>
              <P $fontWeight="500" $color={COLORS.gray12} $align="left">
                First Name
              </P>
              <styles.TruncatedText
                $fontWeight="400"
                $color={COLORS.gray11}
                $align="left"
              >
                Jane
              </styles.TruncatedText>
            </styles.SettingDetail>
            <styles.SettingDetail>
              <P $fontWeight="500" $color={COLORS.gray12} $align="left">
                Last Name
              </P>
              <styles.TruncatedText
                $fontWeight="400"
                $color={COLORS.gray11}
                $align="left"
              >
                Doe
              </styles.TruncatedText>
            </styles.SettingDetail>
            <styles.SettingDetail>
              <P $fontWeight="500" $color={COLORS.gray12} $align="left">
                Phone Number
              </P>
              <styles.TruncatedText
                $fontWeight="400"
                $color={COLORS.gray11}
                $align="left"
              >
                123-456-7890
              </styles.TruncatedText>
            </styles.SettingDetail>
          </styles.SubHeader>
        </div>
      </styles.Content>
    </styles.AvailabilityContainer>
  );
}
