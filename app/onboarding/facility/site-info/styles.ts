'use client';

import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { Sans } from '@/styles/fonts';

export const RedAsterisk = styled.span`
  color: #b22222;
`;

interface GrayInputProps {
  checked?: boolean;
}

export const GrayInput = styled.div<GrayInputProps>`
  display: flex;
  font-family: ${Sans.style.fontFamily};
  font-size: 1rem;
  color: ${COLORS.gray10};
  background: ${COLORS.gray1};
  margin-top: 0.1875rem;
  border-radius: 0.5rem;
  width: 100%;
  cursor: pointer;
  box-sizing: border-box;
  padding: 12px 16px 12px 16px;
  align-items: flex-center;
  justify-content: flex-start;
  gap: 12px;
  border: ${({ checked }) =>
    checked ? `1px solid ${COLORS.rose10}` : `1px solid ${COLORS.gray6}`};
  box-shadow: ${({ checked }) =>
    checked ? '0rem 0rem 0.5rem 0rem rgba(227, 66, 66, 0.25)' : 'none'};
`;

export const RadioContainer = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;

  input {
    appearance: none;
    width: 1.25rem;
    height: 1.25rem;
    border: 0.125rem solid ${COLORS.gray10};
    border-radius: 50%;
    position: relative;
    cursor: pointer;
  }

  input:checked {
    border: 0.125rem solid ${COLORS.rose10}; /* Custom color for checked */
  }

  input:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0.75rem;
    height: 0.75rem;
    background-color: ${COLORS.rose10}; /* Red inner circle */
    border-radius: 50%;
    transform: translate(-50%, -50%); /* Center the circle */
  }
`;

export const QuestionContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 0.5rem;
  flex-direction: column;
`;
