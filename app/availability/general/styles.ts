'use client';

import NextImage from 'next/image';
import styled from 'styled-components';
import { H6 } from '@/styles/text';

export const Page = styled.main`
  display: flex;
  min-width: 100%;
  min-height: 100svh;
  justify-content: center;
  overflow: hidden;
`;
export const AllAvailabilitiesHolder = styled.main`
  display: flex;
  width: 28.75%;
  flex-direction: column;
`;

export const TitleContainer = styled.main`
  display: flex;
  margin-top: 4.43rem;
  margin-bottom: 2.62rem;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const YearText = styled(H6)`
  margin-bottom: 1.5rem;
`;

export const AddImage = styled(NextImage)`
  width: 1.5rem;
  height: 1.5rem;
`;
