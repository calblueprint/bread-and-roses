'use client';

import NextImage from 'next/image';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { Sans } from '@/styles/fonts';

export const Image = styled(NextImage)`
  width: 20px;
  height: 20px;
  margin-top: 1rem;
`;

export const ReviewContainer = styled.main`
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  padding: 32px 32px 32px 32px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background: ${COLORS.bread1};
  border-radius: 16px;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.15);
`;

export const SmallText = styled.text`
  color: ${COLORS.gray11};
  font-size: 14px;
  line-height: normal;
  margin-bottom: 0.1rem;
`;

export const Line = styled.main`
  width: 100%;
  height: 2px;
  color: black;
  background: linear-gradient(
    90deg,
    rgba(184, 184, 184, 0) 0%,
    #b8b8b8 50%,
    rgba(184, 184, 184, 0) 100%
  );
  margin-top: 1.5rem;
`;

export const ConfirmText = styled.text`
  ${Sans.style}
  color: white;
  font-size: 14px;
`;
