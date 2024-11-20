'use client';

import NextImage from 'next/image';
import styled from 'styled-components';
import { H3, H6 } from '@/styles/text';

export const MenuImage = styled(NextImage)`
  width: 1.5rem;
  height: 1.5rem;
  margin: 1rem;
`;

export const Page = styled.main`
  flex-direction: column;
  min-width: 100%;
  min-height: 100svh;
  overflow: hidden;
  padding: 2rem;
`;

export const AllEventsHolder = styled.main`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Title = styled(H3)`
  margin-top: 2rem;
  font-style: normal;
  line-height: normal;
`;

export const MonthYear = styled(H6)`
  font-style: normal;
  line-height: normal;
  gap: 1.5rem;
  display: flex;
  margin-top: 1.25rem;
`;
