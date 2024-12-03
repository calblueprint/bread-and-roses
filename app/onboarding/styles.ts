'use client';

import NextImage from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { Sans } from '@/styles/fonts';
import { H5, P } from '@/styles/text';
import COLORS from '../../styles/colors';

export const Background = styled.main`
  flex-direction: column;
  min-width: 100%;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.bread2};
  overflow: hidden;
`;

export const InlineContainer = styled.main`
  width: 30%;
  flex-direction: column;
  margin-top: 2%;
  margin-bottom: 2%;

  @media (max-width: 1200px) {
    width: 45%;
  }
  @media (max-width: 768px) {
    width: 85%;
  }
`;

export const Image = styled(NextImage)`
  width: 20px;
  height: 20px;
  margin-bottom: 16px;
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
`;

export const Rectangle = styled.div<{
  variant: 'light' | 'dark';
  width: string;
}>`
  width: ${({ width }) => width};
  height: 2px;
  display: inline-block;
  background: ${({ variant }) =>
    variant === 'light' ? COLORS.gray4 : COLORS.gray12};
`;

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* justify-content: space-between; */
  background-color: ${COLORS.bread1};
  border-radius: 8px;
  padding: 32px;
  gap: 28px;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.15);
  margin: 42px 0;
`;

export const Input = styled.input`
  font-family: ${Sans.style.fontFamily};
  padding: 0.5rem;
  margin-top: 0.1875rem;
  border: 1px solid ${COLORS.gray6};
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
`;

export const Title = styled(H5)`
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

export const Label = styled(P)`
  color: ${COLORS.gray11};
  font-weight: 400;
`;

export const SkipContainer = styled.button`
  margin-bottom: 16px;
  width: 100%;
  background: transparent;
  border: none;
  display: flex;
  justify-content: flex-end;
`;

export const SkipButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const SkipText = styled(P)`
  color: ${COLORS.gray11};
  font-weight: 400;
  text-align: right;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 80%;
  width: 100%;
`;

export const Button = styled.button`
  width: 100%;
  height: 2.75rem;
  background-color: ${COLORS.pomegranate10};
  border-color: ${COLORS.pomegranate10};
  border-style: solid;
  border-radius: 8px;
  display: inline-flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  width: 100%;
`;

export const ContinueText = styled.text`
  ${Sans.style}
  color: white;
  font-size: 14px;
  padding: 10px;
  text-decoration: none;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;
