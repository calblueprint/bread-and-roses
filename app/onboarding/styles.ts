'use client';

import NextImage from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { Sans } from '@/styles/fonts';
import { H4, P, SMALL } from '@/styles/text';

export const Background = styled.main<{ iscentered?: string }>`
  flex-direction: column;
  min-width: 100%;
  min-height: 100svh;
  display: flex;
  align-items: center;
  ${({ iscentered: isCentered }) =>
    isCentered === 'true' && 'justify-content: center;'}
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
  position: relative;
  width: 20px;
  height: 20px;
  border: 2px solid ${COLORS.gray10};
  border-radius: 4px;
  appearance: none;
  outline: none;
  cursor: pointer;

  &:checked {
    background-color: ${COLORS.rose10};
    border-color: ${COLORS.rose10};

    &::before {
      display: inline-block;
    }
  }

  &::before {
    content: '';
    display: none;
    position: absolute;
    width: 16px;
    height: 16px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('/images/whitecheck.svg');
    background-position: center;
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
  border-radius: 8px;
  gap: 1.75rem;
  margin: 2.625rem 0;

  @media (min-width: 768px) {
    background-color: ${COLORS.bread1};
    box-shadow: 0px 6px 15px -2px rgba(0, 0, 0, 0.08);
    padding: 2rem;
  }
`;

export const RoleContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 1rem 0 2.625rem 0px;
  justify-content: space-between;
  border-radius: 8px;
  gap: 1rem;
  height: 100%;
`;

export const Input = styled.input`
  font-family: ${Sans.style.fontFamily};
  font-size: 1rem;
  padding: 0.5rem;
  margin-top: 0.1875rem;
  border: 1px solid ${COLORS.gray6};
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: ${COLORS.gray6};
  }
`;

export const TextArea = styled.textarea`
  font-family: ${Sans.style.fontFamily};
  font-size: 1rem;
  padding: 0.5rem;
  margin-top: 0.1875rem;
  border: 1px solid ${COLORS.gray6};
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  resize: none;

  &::placeholder {
    color: ${COLORS.gray6};
  }
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  font-family: ${Sans.style.fontFamily};
  font-size: 1rem;
  border: 0.0625rem solid ${COLORS.gray6};
  border-radius: 0.25rem;
  resize: none;
  min-height: 6.25rem;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
`;

export const Title = styled(H4)`
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

export const Label = styled(P)`
  color: ${COLORS.gray11};
  font-weight: 500;
`;

export const SkipButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;

  @media (max-width: 768px) {
    position: fixed;
    bottom: 6.25rem;
  }

  @media (min-width: 768px) {
    position: relative;
    align-self: flex-end;
    margin-bottom: 1rem;
  }
`;

export const SkipText = styled(P)`
  color: ${COLORS.gray11};
  font-weight: 400;
  text-align: right;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 80%;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 7.5rem;
  }
`;

export const Button = styled.button<{
  disabled?: boolean;
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
}>`
  position: static;
  bottom: 4.375rem;
  width: 100%;
  height: 2.75rem;
  background-color: ${({ disabled }) =>
    disabled ? COLORS.pomegranate10 : COLORS.pomegranate12};
  border-color: ${({ disabled }) =>
    disabled ? COLORS.pomegranate10 : COLORS.pomegranate12};
  border-style: solid;
  border-radius: 8px;
  display: inline-flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  text-decoration: none;
  transition: all 0.3s ease;
  z-index: 2;

  @media (max-width: 768px) {
    position: fixed;
    width: 85%;
    bottom: 2rem;
  }
`;

export const SubmitButton = styled.button<{ disabled?: boolean }>`
  margin-top: 2.625rem;
  width: 100%;
  height: 2.75rem;
  background-color: ${({ disabled }) =>
    disabled ? COLORS.pomegranate10 : COLORS.pomegranate12};
  border-color: ${({ disabled }) =>
    disabled ? COLORS.pomegranate10 : COLORS.pomegranate12};
  border-style: solid;
  border-radius: 8px;
  display: inline-flex;
  padding: 0.5;
  justify-content: center;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  text-decoration: none;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    margin-bottom: 2.5rem;
  }
`;

export const ContinueText = styled(SMALL)`
  ${Sans.style}
  color: white;
  font-size: 0.875rem;
  font-weight: 400;
  padding: 0.625rem;
  text-decoration: none;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;

export const FixedFooter = styled.div`
  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 93px;
    background-color: #f5f5f3;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    border-top: 2px solid ${COLORS.gray4};
  }
`;
