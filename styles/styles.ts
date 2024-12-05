'use client';

import NextImage from 'next/image';
import styled from 'styled-components';
import { Sans } from '@/styles/fonts';
import { SMALL } from '@/styles/text';
import COLORS from './colors';

export const Background = styled.main`
  flex-direction: column;
  min-width: 100%;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const Title = styled.h1`
  font-size: 24px;
  text-align: start;
  color: ${COLORS.gray11};
  font-weight: 500;
`;

export const InlineContainer = styled.main`
  width: 25%;
  flex-direction: column;
  margin-top: 2%;
  margin-bottom: 2%;
  @media (max-width: 1200px) {
    width: 30%;
  }
  @media (max-width: 768px) {
    width: 80%;
  }
`;

export const Image = styled(NextImage)`
  width: 85px;
  height: 85px;
  flex-shrink: 0;
  position: relative;
  top: 60px;
  z-index: 1;
`;

export const Circle = styled.main`
  width: 85px;
  height: 85px;
  flex-shrink: 0;
  background-color: #f7c1bd;
  border-radius: 100%;
  position: relative;
  top: 60px;
  z-index: 1;
`;

export const ReviewContainer = styled.main`
  position: relative; /* This makes the Circle position relative to this container */
  display: flex;
  padding: 60px 32px 32px 32px;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 20px;
  border-radius: 16px;
  background: var(--bread-1, #fefdfc);
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.15);
`;

export const ContinueButton = styled.button`
  display: flex;
  margin-top: 0.75rem;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border-radius: 99999px;
  background: ${COLORS.pomegranate};
  border-style: solid;
  border-color: ${COLORS.gray12};
  cursor: pointer;
`;

interface RoundedCornerButtonProps {
  width?: string;
  bgColor?: string;
  textColor?: string;
}

export const RoundedCornerButton = styled.button<RoundedCornerButtonProps>`
  font-family: ${Sans.style.fontFamily};
  background-color: ${props => props.bgColor || COLORS.pomegranate};
  color: ${props => props.textColor || 'white'};
  font-size: 1rem;
  padding: 0.55rem;
  border: 1.5px solid black;
  border-radius: 8px;

  cursor: pointer;
  margin-top: 0.5rem;
  width: ${props => props.width || '100%'};
  margin-left: auto;
  margin-right: auto;
`;

export const Footer = styled.div`
  font-family: ${Sans.style.fontFamily};
  text-align: center;
  margin-top: -0.75rem;
  width: 100%;
  padding: 0.5rem;
`;

export const Link = styled.a`
  color: ${COLORS.lilac9};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const EmailContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: -0.9rem;
  gap: 8px;
`;

export const EmailIconStyled = styled(NextImage)`
  width: 24px;
  height: 24px;
  margin-right: -4px;
`;

export const EmailText = styled.p`
  font-size: 1rem;
  color: ${COLORS.gray11};
  line-height: 1.5;
  display: inline-block;
`;

export const ResendMessage = styled(SMALL)<{ $isError: boolean }>`
  color: ${({ $isError }) => ($isError ? 'red' : 'green')};
  text-align: center;
  font-weight: 400;
  margin-top: -0.75rem;
  font-size: 1rem;
  display: block;
`;
