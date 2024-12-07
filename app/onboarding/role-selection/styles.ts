'use client';

import Image from 'next/image';
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
  padding: 12px 16px;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid
    ${({ isSelected }) => (isSelected ? COLORS.gray12 : COLORS.gray6)};
  background: ${({ isSelected }) => (isSelected ? 'white' : COLORS.bread2)};
  transition: all 0.3s ease;
`;

export const RoleContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;
  gap: 15px;
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

export const Icon = styled(Image)`
  width: 30px;
  height: 30px;
  display: block;
  object-fit: contain;
`;
