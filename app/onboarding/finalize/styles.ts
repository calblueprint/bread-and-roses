'use client';

import NextImage from 'next/image';
import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const Title = styled.h1`
  font-size: 2rem;
  text-align: start;
  color: ${COLORS.gray11};
  font-weight: 500;
`;

export const InlineContainer = styled.main`
  width: 25%;
  flex-direction: column;
  margin-top: 2%;
  margin-bottom: 2%;
  @media (max-width: 1200px) {
    width: 30%;
  }
  @media (max-width: 1024px) {
    width: 80%;
  }
`;

export const Image = styled(NextImage)`
  width: 85px;
  height: 85px;
  flex-shrink: 0;
  position: relative;
  top: 60px;
  z-index: 1;
`;

export const Circle = styled.main`
  width: 5.3125rem;
  height: 5.3125rem;
  flex-shrink: 0;
  background-color: #f7c1bd;
  border-radius: 100%;
  position: relative;
  top: 3.75rem;
  z-index: 1;
`;

export const ReviewContainer = styled.main`
  position: relative;
  display: flex;
  padding: 3.25rem 2rem 2rem 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 1.25rem;
  border-radius: 16px;
  background: var(--bread-1, #fefdfc);
  box-shadow: 0px 6px 15px -2px rgba(0, 0, 0, 0.08);
`;

export const ContinueButton = styled.button`
  display: flex;
  margin-top: 0.75rem;
  padding: 0.75rem 1rem;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 8px;
  background: ${COLORS.pomegranate12};
  border-style: solid;
  border-color: ${COLORS.gray12};
  cursor: pointer;
`;
