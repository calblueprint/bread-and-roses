import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { P } from '@/styles/text';

export const TimeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DaylightTime = styled(P)`
  color: ${COLORS.gray10};
  font-weight: 400;
  @media (min-width: 1024px) {
    display: none;
  }
`;
