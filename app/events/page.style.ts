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
  background: ${COLORS.gray1};
`;

export const Title = styled(H3)`
  font-style: normal;
  line-height: normal;
`;

export const MonthYear = styled(H6)`
  font-style: normal;
  line-height: normal;
`;
