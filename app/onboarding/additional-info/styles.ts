'use client';

import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { Sans } from '@/styles/fonts';

export const TextArea = styled.textarea`
  font-family: ${Sans.style.fontFamily};
  height: 120px;
  padding: 1rem;
  margin-top: 0.1875rem;
  border: 1px solid ${COLORS.gray6};
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  resize: none;
`;
