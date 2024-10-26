'use client';

import NextImage from 'next/image';
import styled from 'styled-components';
import { Sans } from '@/styles/fonts';
import COLORS from '../../../styles/colors';

export const Image = styled(NextImage)`
  width: 20px;
  height: 20px;
  margin-top: 1rem;
`;

export const Title = styled.h1`
  font-size: 24px;
  text-align: start;
  color: ${COLORS.gray11};
  margin-top: 0;
  font-weight: 500;
  margin-bottom: 28px;
`;

export const ReviewContainer = styled.main`
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  padding: 32px 32px 32px 32px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background: #fefdfc;
  border-radius: 16px;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.15);
`;

export const SmallText = styled.text`
  color: #515151;
  font-size: 14px;
  line-height: normal;
  margin-bottom: 28px;
`;

export const Line = styled.main`
  width: 362px;
  height: 2px;
  color: black;
  background: linear-gradient(
    90deg,
    rgba(184, 184, 184, 0) 0%,
    #b8b8b8 50%,
    rgba(184, 184, 184, 0) 100%
  );
  margin-bottom: 28px;
`;

export const ConfirmButton = styled.button`
  display: flex;
  width: 100%;
  padding: 12px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: ${COLORS.gray12};
  border-style: solid;
  border-color: ${COLORS.gray12};
  cursor: pointer;
`;

export const ConfirmText = styled.text`
  ${Sans.style}
  color: white;
  font-size: 14px;
`;
