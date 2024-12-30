import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${COLORS.gray4};
  border-radius: 2px;
  margin-top: 1.5rem;
`;

export const ProgressBarFiller = styled.div<{
  progress: number;
}>`
  width: ${props => props.progress}%;
  height: 100%;
  background-color: ${COLORS.gray12};
`;
