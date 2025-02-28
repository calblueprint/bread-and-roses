'use client';

import NextImage from 'next/image';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { H3 } from '@/styles/text';

export const SearchBar = styled.div`
  display: flex;
  padding: 0.75rem 1rem;
  align-items: center;
  gap: 8px;
  width: 100%;
  border-radius: 625rem;
  background-color: ${COLORS.bread2};
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.15);
  margin-top: 1.25rem;
`;

export const SearchInput = styled.input`
  all: unset;
  color: ${COLORS.gray10};
  width: 100%;
  font-weight: 400;
`;

export const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  margin-bottom: 0.25rem;
`;

export const Page = styled.main<{ $menuExpanded: boolean }>`
  display: flex;
  min-width: 90%;
  min-height: 100vh;
  justify-content: center;
  overflow: hidden;
  margin-left: ${({ $menuExpanded }) =>
    $menuExpanded ? '15%' : '0px'}; /* Adjust margin based on menu expansion */
  transition: margin-left 0.3s ease; /* Smooth transition for menu toggle */
`;

export const DiscoverHolder = styled.main`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 2rem;
  box-sizing: border-box;
`;

export const Discover = styled(H3)`
  padding-top: 1.5rem;
`;

export const DiscoverCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.688rem;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 1rem 0 1rem 0;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  white-space: normal;
`;

export const Icon = styled(NextImage)`
  width: 20px;
  height: 20px;
`;
