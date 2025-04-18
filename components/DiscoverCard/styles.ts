'use client';

import NextImage from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { P, SMALLER } from '@/styles/text';

interface TagProps {
  $bgColor?: string;
}

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const Container = styled.div<{ $search: boolean }>`
  ${({ $search }) =>
    $search
      ? `
          display: flex;
          height: 100%;
          width: 100%;
          box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.06);
        `
      : `
          display: inline-block;
          height: 17.5rem;
          width: 13.875rem;
          box-shadow: 0px 6px 15px -2px rgba(0, 0, 0, 0.08);
        `}
  background-color: ${COLORS.bread1};
  border: none;
  border-radius: 0.5rem;
`;

export const ImageContainer = styled.div<{ $search: boolean }>`
  ${({ $search }) =>
    $search
      ? `
          height: 100%;
          width: 8rem;
          border-radius: 0.5rem 0 0 0.5rem;
        `
      : `
          height: 9.375rem;
          width: 100%;
          border-radius: 0.5rem 0.5rem 0 0;
        `}
  position: relative;
  overflow: hidden;
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

export const Subtitle = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  column-gap: 0.25rem;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SubtitleText = styled(SMALLER)`
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
