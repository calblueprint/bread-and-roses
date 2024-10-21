'use client';

import NextImage from 'next/image';
import styled from 'styled-components';
import COLORS from '../../styles/colors';
import { BespokeSans } from '../../styles/fonts';

export const Image = styled(NextImage)`
  layout: responsive;
  width: 20%;
  height: 90%;
`;

export const Page = styled.main`
  background: ${COLORS.gray1};
`;

export const Title = styled.main`
  color: #000;
  font-family: ${BespokeSans.style.fontFamily};
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: left;
  height: 50px;
`;
