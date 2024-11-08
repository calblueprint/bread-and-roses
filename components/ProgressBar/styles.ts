import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const ProgressBarContainer = styled.div`
  display: inline;
  width: 100%;
  height: 2px;
  background-color: ${COLORS.gray4};
  border-radius: 2px;
  margin-bottom: 2rem;
`;

export const ProgressBarFiller = styled.div<{
  progress: number;
}>`
  height: 100%;
  width: ${props => props.progress}%;
  background-color: ${COLORS.gray12};
  transition: width 0.25s ease-in-out;
`;
