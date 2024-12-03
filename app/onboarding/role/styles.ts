'use client';

import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const Checkbox = styled.input`
  width: 25px;
  height: 25px;
  border-style: solid;
  margin-right: 1rem;
`;

export const BoxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 12px 16px;
  align-items: center;
  gap: 16px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid ${COLORS.gray6};
  background: ${COLORS.bread2};
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 25px 0px;
  justify-content: space-between;
  border-radius: 8px;
  padding: 13%;
  gap: 16px;
  height: 100%;
  border: 1px solid ${COLORS.gray6};
`;

export const InlineContainer = styled.main`
  width: 30%;
  flex-direction: column;
  height: 100%;
  margin-top: 2%;
  margin-bottom: 2%;

  @media (max-width: 1200px) {
    width: 45%;
  }
  @media (max-width: 768px) {
    width: 85%;
  }
`;

export const Rectangle = styled.div`
  display: flex;
  width: 400px;
  height: 2px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 100%;
  background-color: ${COLORS.gray5};
`;
