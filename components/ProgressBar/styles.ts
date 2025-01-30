import styled, { keyframes } from 'styled-components';
import COLORS from '@/styles/colors';

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${COLORS.gray4};
  border-radius: 2px;
  margin-top: 1.5rem;
`;

const progressAnimation = (start: number, end: number) => keyframes`
  from {
    width: ${start}%;
  }
  to {
    width: ${end}%;
  }
`;

export const ProgressBarFiller = styled.div<{
  from: number;
  to: number;
}>`
  width: ${props => props.to}%;
  height: 100%;
  background-color: ${COLORS.gray12};
  animation-name: ${({ from, to }) => progressAnimation(from, to)};
  animation-duration: 1.5s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
`;
