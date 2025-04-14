import React from 'react';
import Edit from '@/public/images/edit.svg';
import COLORS from '@/styles/colors';
import { H5, P } from '@/styles/text';
import * as styles from './styles';

export default function SettingCardNotifications() {
  return (
    <styles.AvailabilityContainer>
      <styles.AvailabilityHeader>
        <styles.AvailabilityTitle>
          <H5 $fontWeight="500" $color={COLORS.bread1} $align="left">
            Notifications
          </H5>
        </styles.AvailabilityTitle>
        <styles.EditIcon src={Edit} alt="Edit" />
      </styles.AvailabilityHeader>
      <styles.Content>
        <div>
          <styles.SubHeader>
            <styles.SettingDetail>
              <P $fontWeight="500" $color={COLORS.gray12} $align="left">
                New Events
              </P>
              <styles.TruncatedText
                $fontWeight="400"
                $color={COLORS.gray11}
                $align="left"
              >
                Email
              </styles.TruncatedText>
            </styles.SettingDetail>
            <styles.SettingDetail>
              <P $fontWeight="500" $color={COLORS.gray12} $align="left">
                Received Sign Up Form
              </P>
              <styles.TruncatedText
                $fontWeight="400"
                $color={COLORS.gray11}
                $align="left"
              >
                Email
              </styles.TruncatedText>
            </styles.SettingDetail>
          </styles.SubHeader>
        </div>
      </styles.Content>
    </styles.AvailabilityContainer>
  );
}
