'use client';

import Image from 'next/image';
import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const BoxContainer = styled.div<{ $isSelected: boolean }>`
  display: flex;
  padding: 0.75rem 1rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  border-radius: 8px;
  border: 1px solid
    ${({ $isSelected }) => ($isSelected ? COLORS.rose10 : COLORS.gray6)};
  background: ${({ $isSelected }) =>
    $isSelected ? COLORS.bread2 : COLORS['bread1.5']};
  transition: all 0.3s ease;

  ${({ $isSelected }) =>
    $isSelected &&
    `
    box-shadow: 0px 0px 8px 0px rgba(227, 66, 66, 0.25);
  `}
`;

export const RoleContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;
  gap: 0.9375rem;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 2.625rem 0rem;
  justify-content: space-between;
  border-radius: 8px;
  gap: 1rem;
  height: 100%;
`;

export const Icon = styled(Image)`
  width: 30px;
  height: 30px;
  display: block;
  object-fit: contain;
`;

interface CheckboxProps {
  shape?: 'circle' | 'square';
}

export const Checkbox = styled.input.attrs({ type: 'checkbox' })<CheckboxProps>`
  width: 20px;
  height: 20px;
  border: 2px solid ${COLORS.gray10};
  border-radius: ${({ shape }) => (shape === 'circle' ? '50%' : '4px')};
  appearance: none;
  outline: none;
  cursor: pointer;

  &:checked {
    background-color: ${COLORS.rose10};
    border-color: ${COLORS.rose10};
  }
`;
