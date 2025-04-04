'use client';

import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { P } from '@/styles/text';

export const ReviewContainer = styled.main`
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 16px;

  @media (min-width: 768px) {
    background: ${COLORS.bread1};
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.15);
    padding: 2rem;
  }
`;

export const SmallText = styled(P)`
  color: ${COLORS.gray11};
  font-weight: 100;
  line-height: normal;
  margin-bottom: 0.6rem;
`;

export const Line = styled.main`
  width: 100%;
  height: 0.125rem;
  color: black;
  background: linear-gradient(
    90deg,
    rgba(184, 184, 184, 0) 0%,
    #b8b8b8 50%,
    rgba(184, 184, 184, 0) 100%
  );
  margin: 1.5rem 0;
`;

export const InfoSection = styled.main`
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;
  width: 100%;
  gap: 1.5rem;
`;

export const InfoSectionLine = styled.main`
  display: flex;
  width: 100%;
  height: 0.0625rem;
  background: ${COLORS.gray7};
`;

export const InfoSectionTitle = styled.main`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-end;
`;

export const SubSection = styled.main`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const RowContainer = styled.main`
  display: flex;
  width: 100%;
  gap: 40%;
`;

export const BackButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;
