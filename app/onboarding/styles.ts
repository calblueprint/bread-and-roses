'use client';

import NextImage from 'next/image';
import styled from 'styled-components';
import COLORS from '../styles/colors';

export const Background = styled.main`
  flex-direction: column;
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.gray2};
  box-sizing: border-box;
  overflow: hidden;
`;

export const InlineContainer = styled.main`
  width: 55vh;
  height: 85vh;
  flex-direction: column;
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
  width: 100$;
  height: 53%;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 25px 0px;
  justify-content: space-between;
  background-color: white;
  border-radius: 8px;
  padding: 13%;
  box-shadow: 5px 5px 5px ${COLORS.gray8};
`;

export const Input = styled.input`
  width: 100%;
  height: 22px;
  border-color: ${COLORS.gray4};
  border-style: solid;
  border-radius: 4px;
  margin-bottom: 18px;
`;

export const Title = styled.h1`
  font-size: 28px;
  text-align: start;
  color: ${COLORS.gray11};
  margin-top: 0;
`;

export const UpdateContainer = styled.main`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export const Checkbox = styled.input`
  width: 25px;
  height: 25px;
  border-style: solid;
`;

export const UpdateText = styled.text`
  text-align: justify;
  margin-left: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 80%;
`;

export const ContinueButton = styled.button`
  width: 20%;
  height: 7%;
  background-color: ${COLORS.gray11};
  border-color: ${COLORS.gray11};
  border-style: solid;
  border-radius: 10px;
`;

export const ContinueText = styled.p`
  color: white;
  font-size: 13px;
  margin-top: 9.5%;
`;

export const RedAsterisk = styled.span`
  color: #b22222;
`;
