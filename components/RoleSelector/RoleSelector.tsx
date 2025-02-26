import React from 'react';
import { H6, SMALL } from '@/styles/text';
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
    <BoxContainer $isSelected={isSelected}>
      <RoleContainer>
        <Checkbox
          name={name}
          checked={isSelected}
          onChange={onChange}
          shape={shape}
        />
        <TextContainer>
          <H6 $fontWeight={500}>{title}</H6>
          <SMALL $fontWeight={400}>{description}</SMALL>
        </TextContainer>
      </RoleContainer>
      <Icon src={iconSrc} alt={name} />
    </BoxContainer>
  );
};

export default RoleSelector;
