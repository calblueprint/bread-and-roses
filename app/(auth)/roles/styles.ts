'use client';

import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { H4, P } from '@/styles/text';

export const Title = styled(H4)`
  margin-top: 0;
  padding-bottom: 1rem;
`;

export const SelectOneText = styled(P)`
  font-weight: 500;
  color: ${COLORS.gray12};
`;
