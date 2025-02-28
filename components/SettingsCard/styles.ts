'use client';

import NextImage from 'next/image';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { SMALL } from '@/styles/text';

export const AvailabilityContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1.5rem;
  border-radius: 16px;
  width: 100%;
  background: ${COLORS.bread1};
  margin-bottom: 3rem;
  box-shadow: 0px 6px 15px -2px rgba(0, 0, 0, 0.08);
`;

export const AvailabilityHeader = styled.main`
  display: flex;
  padding: 1.5rem;
  justify-content: space-between;
  align-items: center;
  background: ${COLORS.pomegranate11};
  border-radius: 16px 16px 0 0;
  width: 100%;
`;

export const AvailabilityTitle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
`;

export const Content = styled.main`
  padding: 0px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SubHeader = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: start;
  margin-bottom: 0.25rem;
`;

export const SettingDetail = styled.main`
  gap: 0.25rem;
`;

export const SettingListedItems = styled.main`
  padding-left: 1.5rem;
  list-style-type: disc;
`;

export const Edit = styled(NextImage)`
  width: 24px;
  height: 24px;
`;

export const TruncatedText = styled(SMALL)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
`;
