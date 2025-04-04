import React, { useEffect, useState } from 'react';
import Edit from '@/public/images/edit.svg';
import COLORS from '@/styles/colors';
import { H5, P } from '@/styles/text';
import * as styles from './styles';
import { Input, InputContainer, Label, RedAsterisk } from './styles';

export default function SettingCardPersonalDetails({
  first_name,
  last_name,
  phone,
}: {
  first_name: string;
  last_name: string;
  phone: string;
}) {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  return (
    <styles.AvailabilityContainer>
      <styles.AvailabilityHeader>
        <styles.AvailabilityTitle>
          <H5 $fontWeight="500" $color={COLORS.bread1} $align="left">
            Personal Details
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
              {isEditable ? (
                <InputContainer>
                  <Label>
                    First Name <RedAsterisk>*</RedAsterisk>
                  </Label>
                  <Input
                    name="first_name"
                    placeholder="Jane"
                    //value={generalInfo.firstName}
                    //onChange={handleChange}
                  />
                </InputContainer>
              ) : (
                <div>
                  <Label>First Name</Label>
                  <styles.TruncatedText
                    $fontWeight="400"
                    $color={COLORS.gray11}
                    $align="left"
                  >
                    {first_name}
                  </styles.TruncatedText>
                </div>
              )}
            </styles.SettingDetail>
            <styles.SettingDetail>
              {isEditable ? (
                <InputContainer>
                  <Label>
                    Last Name <RedAsterisk>*</RedAsterisk>
                  </Label>
                  <Input
                    name="last_name"
                    placeholder="Doe"
                    //value={generalInfo.firstName}
                    //onChange={handleChange}
                  />
                </InputContainer>
              ) : (
                <div>
                  <Label>Last Name</Label>
                  <styles.TruncatedText
                    $fontWeight="400"
                    $color={COLORS.gray11}
                    $align="left"
                  >
                    {last_name}
                  </styles.TruncatedText>
                </div>
              )}
            </styles.SettingDetail>
            <styles.SettingDetail>
              {isEditable ? (
                <InputContainer>
                  <Label>
                    Phone Number <RedAsterisk>*</RedAsterisk>
                  </Label>
                  <Input
                    name="phone_number"
                    placeholder="(987) 654 3210)"
                    //value={generalInfo.firstName}
                    //onChange={handleChange}
                  />
                </InputContainer>
              ) : (
                <div>
                  <Label>Phone Number</Label>
                  <styles.TruncatedText
                    $fontWeight="400"
                    $color={COLORS.gray11}
                    $align="left"
                  >
                    {phone}
                  </styles.TruncatedText>
                </div>
              )}
            </styles.SettingDetail>
          </styles.SubHeader>
        </div>
      </styles.Content>
    </styles.AvailabilityContainer>
  );
}
