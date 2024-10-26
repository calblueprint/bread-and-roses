'use client';

import NextImage from 'next/image';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { H3, H6 } from '@/styles/text';

export const Image = styled(NextImage)`
  layout: responsive;
  width: 20%;
  height: 90%;
`;

export const Page = styled.main`
  background-color: ${COLORS.gray1};
  flex-direction: column;
  min-width: 100%;
  min-height: 100svh;
  overflow: hidden;
`;

export const AllEventsHolder = styled.main`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Title = styled(H3)`
  font-style: normal;
  line-height: normal;
  height: 50px;
`;

export const MonthYear = styled(H6)`
  font-style: normal;
  line-height: normal;
  gap: 24px;
  display: flex;
  margin-top: 24px;
`;
