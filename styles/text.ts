'use client';

import styled, { css } from 'styled-components';
import { BespokeSans } from './fonts';

interface TextProps {
  $color?: string;
  $fontWeight?: number | string;
  $align?: 'left' | 'right' | 'center' | 'end' | 'justify' | 'start';
}

const TextStyles = css<TextProps>`
  ${BespokeSans.style}
  font-weight: ${({ $fontWeight }) => $fontWeight || '700'};
  color: ${({ $color }) => $color || 'black'};
  text-align: ${({ $align }) => $align};
  margin: 0;
`;

export const H1 = styled.h1<TextProps>`
  ${TextStyles}
  font-size: 3rem;
`;

export const H2 = styled.h2<TextProps>`
  ${TextStyles}
  font-size: 2.5rem;
`;

export const H3 = styled.h3<TextProps>`
  ${TextStyles}
  display: block;
  font-size: 2rem;
`;

export const H4 = styled.h4<TextProps>`
  ${TextStyles}
  font-size: 1.75rem;
`;

export const H5 = styled.h5<TextProps>`
  ${TextStyles}
  font-size: 1.5rem;
`;

export const H6 = styled.h6<TextProps>`
  ${TextStyles}
  font-size: 1.25rem;
`;

export const P = styled.p<TextProps>`
  ${TextStyles}
  font-size: 1rem;
  font-weight: 400;
`;

export const SMALL = styled.p<TextProps>`
  ${TextStyles}
  font-size: .875rem;
  font-weight: 400;
`;
