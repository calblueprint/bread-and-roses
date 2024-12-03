'use client';

import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { P } from '@/styles/text';

export const Checkbox = styled.input`
  width: 25px;
  height: 25px;
  border-style: solid;
  margin-right: 1rem;
`;

export const BoxContainer = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: flex-start;
  padding: 12px 16px;
  align-items: center;
  gap: 16px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid
    ${({ isSelected }) => (isSelected ? COLORS.gray12 : COLORS.gray6)};
  background: ${({ isSelected }) => (isSelected ? 'white' : COLORS.bread2)};
  transition: all 0.3s ease;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 42px 0px;
  justify-content: space-between;
  border-radius: 8px;
  gap: 16px;
  height: 100%;
`;

export const ChooseBothText = styled(P)`
  font-weight: 200;
  color: ${COLORS.gray11};
  margin-top: 30px;
`;
