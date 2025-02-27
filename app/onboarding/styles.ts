'use client';

import NextImage from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { Sans } from '@/styles/fonts';
import { H4, P } from '@/styles/text';

export const Background = styled.main<{ isCentered?: boolean }>`
  flex-direction: column;
  min-width: 100%;
  min-height: 100svh;
  display: flex;
  align-items: center;
  ${({ isCentered }) => isCentered && 'justify-content: center;'}
  background-color: ${COLORS.bread2};
  overflow: hidden;
`;

export const BackButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const InlineContainer = styled.main`
  width: 30%;
  flex-direction: column;
  margin-top: 5%;
  margin-bottom: 2%;

  @media (max-width: 1200px) {
    width: 45%;
  }
  @media (max-width: 768px) {
    width: 85%;
    margin-top: 20%;
  }
`;

export const RowContainer = styled.main`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 6%;
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 20px;
  height: 20px;
  border: 2px solid ${COLORS.rose10};
  border-radius: 4px;
  appearance: none;
  outline: none;
  cursor: pointer;

  &:checked {
    background-color: ${COLORS.rose10};
    border-color: ${COLORS.rose10};
  }
`;

export const Image = styled(NextImage)`
  width: 20px;
  height: 20px;
  margin-bottom: 16px;
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

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const RoleContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 42px 0px;
  justify-content: space-between;
  border-radius: 8px;
  gap: 16px;
  height: 100%;
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

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
`;

export const Title = styled(H4)`
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

export const Label = styled(P)`
  color: ${COLORS.gray11};
  font-weight: 400;
`;

export const SkipButton = styled.button`
  position: fixed;
  bottom: 140px;
  background: transparent;
  border: none;
  cursor: pointer;

  @media (max-width: 768px) {
    bottom: 100px;
  }
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

export const Button = styled.button<{
  disabled?: boolean;
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
}>`
  position: ${({ position = 'fixed' }) => position};
  bottom: 70px;
  width: ${({ position }) => (position === 'fixed' ? '30%' : '100%')};
  height: 2.75rem;
  background-color: ${({ disabled }) =>
    disabled ? COLORS.pomegranate10 : COLORS.pomegranate12};
  border-color: ${({ disabled }) =>
    disabled ? COLORS.pomegranate10 : COLORS.pomegranate12};
  border-style: solid;
  border-radius: 8px;
  display: inline-flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  text-decoration: none;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 85%;
    bottom: 40px;
  }
`;

export const SubmitButton = styled.button<{ disabled?: boolean }>`
  margin-top: 42px;
  width: 100%;
  height: 2.75rem;
  background-color: ${({ disabled }) =>
    disabled ? COLORS.pomegranate10 : COLORS.pomegranate12};
  border-color: ${({ disabled }) =>
    disabled ? COLORS.pomegranate10 : COLORS.pomegranate12};
  border-style: solid;
  border-radius: 8px;
  display: inline-flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  text-decoration: none;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    bottom: 40px;
  }
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
