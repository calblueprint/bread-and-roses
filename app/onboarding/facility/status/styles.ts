'use client';

import Image from 'next/image';
import styled from 'styled-components';
import Check from '@/public/images/check.png'; // Image for completed steps
import Uncheck from '@/public/images/uncheck.svg'; // Image for incomplete steps
import COLORS from '@/styles/colors';

export const BNRLogo = styled(Image)`
  width: 12.3125rem;
  height: 4.25rem;
  margin: 2.5rem;
`;

export const InlineContainer = styled.main`
  flex-direction: column;
  width: 31.25%;
  @media (max-width: 768px) {
    width: 85%;
  }
`;

export const BoxContentContainer = styled.main`
  display: flex;
  padding: 2rem;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background: ${COLORS.bread1};
  border-radius: 16px;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.15);
  gap: 1.75rem;
`;

export const LocationDetails = styled.main`
  display: flex;
  gap: 0.25rem;
  flex-direction: column;
`;

export const StyledUL = styled.ul`
  position: relative;
  list-style: none;
  margin-bottom: 1.25rem;

  &::before {
    content: '';
    position: absolute;
    left: 0.5rem; /* Aligns with the center of circles */
    top: 0.125rem;
    bottom: 0;
    width: 0.125rem;
    background: ${COLORS.rose6};
  }
`;

export const StyledLI = styled.li<{ $completed: string }>`
  list-style: none;
  position: relative;
  margin: 0 0 1.75rem 0;
  display: flex;
  align-items: center;
  color: ${({ $completed }) =>
    $completed == 'true' ? COLORS.gray10 : COLORS.gray12};
  font-weight: ${({ $completed }) =>
    $completed == 'true' ? 400 : 500}; /* Change font weight */

  &::before {
    content: '';
    display: inline-block;
    width: 1.2em;
    height: 1.2em;
    margin-right: 0.875rem;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: ${({ $completed }) =>
      $completed == 'true' ? `url(${Check.src})` : `url(${Uncheck.src})`};
  }

  &:last-child {
    margin-bottom: -1.25rem;
  }
`;

export const UserDetails = styled.main`
  @media (min-width: 768px) {
    margin-top: 2.625rem;
  }

  @media (max-width: 768px) {
    margin-top: 5rem;
  }

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
`;

export const Email = styled.main`
  display: flex;
  justify-content: flex-end;
`;

export const ContentAfterSteps = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;

export const Page = styled.main`
  flex-direction: column;
  min-width: 100%;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-bottom: 3rem;
`;
