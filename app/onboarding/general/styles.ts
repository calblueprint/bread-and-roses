'use client';

import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const UpdateContainer = styled.main`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
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

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
`;

export const UpdateText = styled.text`
  text-align: left;
  margin-left: 15px;
`;

export const RedAsterisk = styled.span`
  color: #b22222;
`;
