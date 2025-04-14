import React from 'react';
import COLORS from '@/styles/colors';
import { P } from '@/styles/text';
import {
  BoxContainer,
  Checkbox,
  Icon,
  RoleContainer,
  TextContainer,
} from './styles';

interface RoleSelectorProps {
  isSelected: boolean;
  name: string;
  title: string;
  description: string;
  iconSrc: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  shape?: 'circle' | 'square';
}

const RoleSelector: React.FC<RoleSelectorProps> = ({
  isSelected,
  name,
  title,
  description,
  iconSrc,
  onChange,
  shape = 'square',
}) => {
  return (
    <label style={{ display: 'block', width: '100%' }}>
      <BoxContainer $isSelected={isSelected}>
        <RoleContainer>
          <Checkbox
            name={name}
            checked={isSelected}
            onChange={onChange}
            shape={shape}
          />
          <TextContainer>
            <P $color={COLORS.gray11} $fontWeight={500}>
              {title}
            </P>
            <P $color={COLORS.gray10} $fontWeight={400}>
              {description}
            </P>
          </TextContainer>
        </RoleContainer>
        <Icon src={iconSrc} alt={name} />
      </BoxContainer>
    </label>
  );
};

export default RoleSelector;
