'use client';

import NextImage from 'next/image';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { P, SMALL, SMALLER } from '@/styles/text';

interface TagProps {
  $bgColor?: string;
}

export const Container = styled.div`
  display: inline-block;
  height: 17.5rem;
  width: 13.875rem;
  background-color: ${COLORS.bread1};
  border-radius: 0.5rem;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.15);
`;

export const ImageContainer = styled.div`
  height: 9.375rem;
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem 0.5rem 0 0;
  background-color: ${COLORS.gray12};
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0;
  gap: 0.5rem;
  padding: 1rem;
  overflow: hidden;
`;

export const EventLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const EventTitle = styled(P)`
  color: ${COLORS.gray12};
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const EventTag = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Subtitle = styled(P)`
  display: flex;
  align-items: center;
  align-self: stretch;
  column-gap: 0.25rem;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SubtitleText = styled(SMALL)`
  color: ${COLORS.gray11};
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LocationText = styled(SMALLER)`
  color: ${COLORS.gray10};
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Icon = styled(NextImage)`
  width: 12px;
  height: 12px;
`;

export const IndividualTag = styled(SMALLER)<TagProps>`
  color: ${COLORS.gray11};
  font-weight: 400;
  background-color: ${({ $bgColor }) => $bgColor || 'gray'};
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  padding: 0.125rem 0.375rem;
  margin-right: 0.625rem;
`;

export const MoreTags = styled(SMALLER)`
  color: ${COLORS.lilac8};
  font-weight: 400;
`;
