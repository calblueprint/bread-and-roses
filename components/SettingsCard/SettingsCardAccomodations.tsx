import React from 'react';
import Edit from '@/public/images/edit.svg';
import COLORS from '@/styles/colors';
import { H5, P } from '@/styles/text';
import * as styles from './styles';

export default function SettingCardAccomodations() {
  return (
    <styles.AvailabilityContainer>
      <styles.AvailabilityHeader>
        <styles.AvailabilityTitle>
          <H5 $fontWeight="500" $color={COLORS.bread1} $align="left">
            Accomodations
          </H5>
        </styles.AvailabilityTitle>
        <styles.Edit src={Edit} alt="Edit" />
      </styles.AvailabilityHeader>
      <styles.Content>
        <div>
          <styles.SubHeader>
            <styles.SettingDetail>
              <P $fontWeight="500" $color={COLORS.gray12} $align="left">
                Accomodations
              </P>
              <styles.TruncatedText
                $fontWeight="400"
                $color={COLORS.gray11}
                $align="left"
              >
                Burnt tomatoes pineapple rib red. Tomato string spinach white
                steak meat lovers buffalo pie. String onions sausage party
                spinach ricotta spinach. Marinara stuffed pizza Chicago Philly
                style tossed. Thin parmesan lasagna lot buffalo lasagna tomatoes
                onions green.
              </styles.TruncatedText>
            </styles.SettingDetail>
          </styles.SubHeader>
        </div>
      </styles.Content>
    </styles.AvailabilityContainer>
  );
}
