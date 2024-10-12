'use client';

import NextImage from 'next/image';
import styled from 'styled-components';
import COLORS from '../../styles/colors';

export const Background = styled.main`
  flex-direction: column;
  min-width: 100%;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: start;
  background-color: ${COLORS.gray2};
  overflow: hidden;
`;

export const InlineContainer = styled.main`
  width: 30%;
  height: 85%;
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
  margin-bottom: -2px;
`;

export const Rectangle = styled.main<{
  variant: 'light' | 'dark';
  widthPercentage: string;
}>`
  width: ${({ widthPercentage }) => widthPercentage};
  height: 7px;
  display: inline-block;
  background: ${({ variant }) =>
    variant === 'light' ? COLORS.gray8 : COLORS.gray10};
  border-radius: 2px;
`;

export const Container = styled.main`
  width: 100%;
  height: 53%;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 25px 0px;
  justify-content: space-between;
  background-color: white;
  border-radius: 8px;
  padding: 13%;
`;

export const InputText = styled.text`
  margin-top: 6%;
`;

export const Input = styled.input`
  width: 100%;
  height: 22px;
  border-color: ${COLORS.gray4};
  border-style: solid;
  border-radius: 4px;
`;

export const Title = styled.h1`
  font-size: 28px;
  text-align: start;
  color: ${COLORS.gray11};
  margin-top: 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 80%;
`;

export const ContinueButton = styled.button`
  width: 5.5rem;
  height: 2.25rem;
  background-color: ${COLORS.gray11};
  border-color: ${COLORS.gray11};
  border-style: solid;
  border-radius: 8px;
  display: inline-flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

export const ContinueText = styled.p`
  color: white;
  font-size: 14px;
  padding: 10px;
`;
