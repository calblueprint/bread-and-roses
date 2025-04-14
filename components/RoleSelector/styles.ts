'use client';

import Image from 'next/image';
import styled, { css } from 'styled-components';
import COLORS from '@/styles/colors';

export const BoxContainer = styled.div<{ $isSelected: boolean }>`
  cursor: pointer;
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
    $isSelected ? COLORS['bread1.5'] : COLORS.bread2};
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

const checkmarkStyles = css`
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  transform: translate(-50%, -50%);
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })<CheckboxProps>`
  position: relative;
  width: 20px;
  height: 20px;
  border: 2px solid ${COLORS.gray10};
  border-radius: ${({ shape }) => (shape === 'circle' ? '50%' : '4px')};
  appearance: none;
  outline: none;
  cursor: pointer;

  ${({ shape }) =>
    shape === 'circle'
      ? css`
          &:checked {
            border: 0.125rem solid ${COLORS.rose10};
          }

          &:checked::after {
            ${checkmarkStyles};
            width: 0.75rem;
            height: 0.75rem;
            background-color: ${COLORS.rose10};
            border-radius: 50%;
          }
        `
      : css`
          &:checked {
            background-color: ${COLORS.rose10};
            border-color: ${COLORS.rose10};

            &::before {
              display: inline-block;
            }
          }

          &::before {
            content: '';
            display: none;
            position: absolute;
            width: 16px;
            height: 16px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-size: contain;
            background-repeat: no-repeat;
            background-image: url('/images/whitecheck.svg');
            background-position: center;
          }
        `}
  
  }
`;
