import React from 'react';
import Edit from '@/public/images/edit.svg';
import COLORS from '@/styles/colors';
import { H5, P } from '@/styles/text';
import * as styles from './styles';

export default function SettingCardPerformanceInterest() {
  return (
    <styles.AvailabilityContainer>
      <styles.AvailabilityHeader>
        <styles.AvailabilityTitle>
          <H5 $fontWeight="500" $color={COLORS.bread1} $align="left">
            Performance Interest
          </H5>
        </styles.AvailabilityTitle>
        <styles.Edit src={Edit} alt="Edit" />
      </styles.AvailabilityHeader>
      <styles.Content>
        <div>
          <styles.SubHeader>
            <styles.SettingDetail>
              <P $fontWeight="500" $color={COLORS.gray12} $align="left">
                Type of Act
              </P>
              <ul>
                <styles.SettingListedItems>
                  <li>
                    <styles.TruncatedText
                      $fontWeight="400"
                      $color={COLORS.gray11}
                      $align="left"
                    >
                      Juggling
                    </styles.TruncatedText>
                  </li>
                  <li>
                    <styles.TruncatedText
                      $fontWeight="400"
                      $color={COLORS.gray11}
                      $align="left"
                    >
                      Music
                    </styles.TruncatedText>
                  </li>
                </styles.SettingListedItems>
              </ul>
            </styles.SettingDetail>
            <styles.SettingDetail>
              <P $fontWeight="500" $color={COLORS.gray12} $align="left">
                Genre
              </P>
              <ul>
                <styles.SettingListedItems>
                  <li>
                    <styles.TruncatedText
                      $fontWeight="400"
                      $color={COLORS.gray11}
                      $align="left"
                    >
                      Classical
                    </styles.TruncatedText>
                  </li>
                  <li>
                    <styles.TruncatedText
                      $fontWeight="400"
                      $color={COLORS.gray11}
                      $align="left"
                    >
                      Country
                    </styles.TruncatedText>
                  </li>
                </styles.SettingListedItems>
              </ul>
            </styles.SettingDetail>
            <styles.SettingDetail>
              <P $fontWeight="500" $color={COLORS.gray12} $align="left">
                Group Size
              </P>
              <styles.TruncatedText
                $fontWeight="400"
                $color={COLORS.gray11}
                $align="left"
              >
                2
              </styles.TruncatedText>
            </styles.SettingDetail>
          </styles.SubHeader>
        </div>
      </styles.Content>
    </styles.AvailabilityContainer>
  );
}
