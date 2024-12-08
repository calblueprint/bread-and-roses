'use client';

import NextImage from 'next/image';
import styled from 'styled-components';
import { H3, H6 } from '@/styles/text';

export const MenuImage = styled(NextImage)`
  width: 1.5rem;
  height: 1.5rem;
  margin: 1rem;
`;

export const Page = styled.main<{ $menuExpanded: boolean }>`
  display: flex;
  min-width: 100%;
  min-height: 100vh;
  justify-content: center;
  overflow: hidden;

  @media (min-width: 1024px) {
    margin-left: ${({ $menuExpanded }) =>
      $menuExpanded ? '10%' : '0'}; /* Fixed margin for the expanded menu */
    transition: margin-left 0.3s ease; /* Smooth transition */
  }
`;

export const AllEventsHolder = styled.main`
  display: flex;
  width: 28.75%;
  flex-direction: column;

  @media (max-width: 900px) {
    width: 80%;
  }
`;

export const Title = styled(H3)`
  margin-top: 4rem;
  margin-bottom: 2rem;
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
