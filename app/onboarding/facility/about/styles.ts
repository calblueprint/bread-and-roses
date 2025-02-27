'use client';

import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { Sans } from '@/styles/fonts';

export const RedAsterisk = styled.span`
  color: #b22222;
`;

export const GrayInput = styled.div`
  font-family: ${Sans.style.fontFamily};
  font-size: 1rem;
  color: ${COLORS.gray10};
  background: ${COLORS.gray1};
  padding: 0.5rem;
  margin-top: 0.1875rem;
  border: 1px solid ${COLORS.gray6};
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
`;
