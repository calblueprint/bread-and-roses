'use client';

import NextImage from 'next/image';
import styled from 'styled-components';
import { P, SMALLER } from '@/styles/text';
import COLORS from '../../styles/colors';

export const BPImage = styled(NextImage)`
  layout: responsive;
  width: 20%;
  height: 90%;
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
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.15);
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
`;
