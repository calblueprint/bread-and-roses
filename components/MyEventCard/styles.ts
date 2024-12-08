'use client';

import NextImage from 'next/image';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { P, SMALLER } from '@/styles/text';

export const EventImage = styled(NextImage)`
  width: 20%;
  height: auto;
`;

export const EventContainer = styled.main`
  margin: auto;
  width: 100%;
  padding-top: 1.5rem;
`;
export const EventCardContainer = styled.main`
  width: 100%;
  padding: 1rem;
  background: ${COLORS.bread1};
  border-radius: 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1.5rem;
`;

export const TimeText = styled(SMALLER)`
  font-style: normal;
  line-height: normal;
`;

export const EventDescriptionText = styled(P)`
  font-style: normal;
  line-height: normal;
`;

export const LocationText = styled(SMALLER)`
  color: ${COLORS.gray10};
  font-style: normal;
  line-height: normal;
  display: flex;
  align-items: center;
`;

export const LPImage = styled(NextImage)`
  width: 0.75rem;
  height: 0.75rem;
  margin-top: 0.25rem;
  margin-right: 0.25rem;
`;
