'use client';

import NextImage from 'next/image';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { H6, P } from '@/styles/text';

export const Container = styled.div`
  display: inline-block;
  height: 18.75rem;
  width: 15.625rem;
  background-color: ${COLORS.bread1};
  border-radius: 0.5rem;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.15);
`;

export const ImageContainer = styled.div`
  height: 6.25rem;
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

export const EventTitle = styled(H6)`
  color: ${COLORS.gray12};
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const EventDescription = styled(P)`
  color: ${COLORS.gray11};
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;

  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  word-break: break-word;
`;

export const Subtitle = styled(P)`
  display: flex;
  align-items: center;
  align-self: stretch;
  column-gap: 0.5rem;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SubtitleText = styled(P)`
  color: ${COLORS.gray12};
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Icon = styled(NextImage)`
  width: 20px;
  height: 20px;
`;
