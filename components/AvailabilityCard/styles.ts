'use client';

import NextImage from 'next/image';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { H5 } from '@/styles/text';

export const AvailabilityContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1.5rem;
  border-radius: 16px;
  width: 100%;
  background: ${COLORS.bread1};
  margin-bottom: 3rem;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.15);
`;

export const AvailabilityTitle = styled(H5)`
  display: flex;
  padding: 16px 24px;
  justify-content: space-between;
  align-items: end;
  background: ${COLORS.pomegranate};
  border-radius: 16px 16px 0 0;
  width: 100%;
`;

export const Content = styled.main`
  padding: 0px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SubHeader = styled.main`
  display: flex;
  align-items: center;
  justify-content: start;
`;

export const Clock = styled(NextImage)`
  width: 16px;
  height: 16px;
  margin-right: 0.25rem;
`;
