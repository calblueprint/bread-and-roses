'use client';

import NextImage from 'next/image';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { Sans } from '@/styles/fonts';
import { H3, H6, SMALL } from '@/styles/text';

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
  width: 30%;
  flex-direction: column;

  @media (max-width: 1024px) {
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

export const ToggleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  background-color: #e9ecf1;
  border-radius: 0.9225rem;
  padding: 0.25rem;
  width: 100%;
  justify-content: center;
`;

export const ToggleButton = styled.button<{ $active: boolean }>`
  font-family: ${Sans.style.fontFamily};
  background-color: ${({ $active }) => ($active ? '#ffffff' : 'transparent')};
  color: ${({ $active }) => ($active ? '#1c1c1c' : '#7d7d7d')};
  border: none;
  border-radius: 0.76875rem;
  padding: 0.5rem 1rem; // less rigid padding
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: ${({ $active }) =>
    $active ? '0rem 0.41px 1.025px 0.41px #C6C6C6;' : 'none'};
  flex: 1 0 0;
  text-align: center;
`;

export const EmptyStateWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SubHeaderText = styled(H6)`
  display: flex;
  margin-top: 5.3075rem;
  font-weight: 500;
  color: ${COLORS.gray12};
  width: 100%;
  justify-content: center;
  text-align: center;
`;

export const SmallText = styled(SMALL)`
  display: flex;
  margin-top: 2rem;
  font-weight: 500;
  width: 100%;
  color: ${COLORS.gray9};
  justify-content: center;
  text-align: center;
`;

export const SignUpButton = styled.button`
  display: flex;
  text-align: center;
  align-self: center;
  font-family: ${Sans.style.fontFamily};
  font-size: 1rem;
  color: white;
  margin-top: 2.5625rem;
  padding: 0.5rem 0.75rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background: ${COLORS.pomegranate12};
  border-style: solid;
  border-color: ${COLORS.gray12};
  cursor: pointer;
`;
