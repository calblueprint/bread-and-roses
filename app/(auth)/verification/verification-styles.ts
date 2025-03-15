import NextImage from 'next/image';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { SMALL } from '@/styles/text';

export const EmailContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: -0.9rem;
  gap: 0.5rem;
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
