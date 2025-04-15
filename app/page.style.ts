'use client';

import NextImage from 'next/image';
import styled, { css, keyframes } from 'styled-components';
import COLORS from '@/styles/colors';

const fadeIn = keyframes`
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
`;

const fadeOut = keyframes`
  0% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.05); }
`;

export const Container = styled.main<{ animateOut?: boolean }>`
  width: 100%;
  height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${COLORS.bread2};
  animation: ${fadeIn} 0.3s ease-out;

  ${({ animateOut }) =>
    animateOut &&
    css`
      animation: ${fadeOut} 0.6s ease-in 0.3s forwards;
    `};

  z-index: 9999;
`;

export const Image = styled(NextImage).attrs({
  width: 240,
  height: 240,
  layout: 'intrinsic',
})`
  margin-bottom: 2.5rem;
  object-fit: contain;
`;

export const Spinner = styled.div`
  border: 8px solid ${COLORS.gray5};
  border-top: 8px solid ${COLORS.pomegranate10};
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
