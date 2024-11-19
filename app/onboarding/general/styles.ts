'use client';

import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const UpdateContainer = styled.main`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 1.75rem;
`;

export const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  border: 2px solid ${COLORS.rose10};
`;

export const UpdateText = styled.text`
  text-align: left;
  margin-left: 15px;
`;

export const RedAsterisk = styled.span`
  color: #b22222;
`;
