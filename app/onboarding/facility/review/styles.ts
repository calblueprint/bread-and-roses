'use client';

import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { P } from '@/styles/text';

export const ReviewContainer = styled.main`
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  padding: 32px 32px 32px 32px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background: ${COLORS.bread1};
  border-radius: 16px;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.15);
`;

export const SmallText = styled(P)`
  color: ${COLORS.gray11};
  font-weight: 100;
  line-height: normal;
  margin-bottom: 0.6rem;
`;

export const Line = styled.main`
  width: 100%;
  height: 2px;
  color: black;
  background: linear-gradient(
    90deg,
    rgba(184, 184, 184, 0) 0%,
    #b8b8b8 50%,
    rgba(184, 184, 184, 0) 100%
  );
  margin-bottom: 1.5rem;
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
  height: 1px;
  background: ${COLORS.gray7};
`;

export const InfoSectionTitle = styled.main`
  display: flex;
  justify-content: space-between;
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

export const ConfirmText = styled.text`
  color: white;
  font-size: 14px;
`;

export const BackButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;
