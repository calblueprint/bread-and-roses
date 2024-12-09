import styled from 'styled-components';
import COLORS from '../../../styles/colors';
import { Sans } from '../../../styles/fonts';
import { P } from '../../../styles/text';

export const EventName = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 500;
`;

export const EventNameInput = styled.input`
  height: 1.5rem;
  text-indent: 0.5rem;
  border-radius: 8px;
  border: 1px solid ${COLORS.gray6};
  ${Sans.style}
`;

export const AdditionalInfo = styled(P)`
  margin-top: 1.25rem;
  font-weight: 500;
`;

export const AdditionalInfoInput = styled.textarea`
  height: 7rem;
  border-radius: 8px;
  border: 1px solid ${COLORS.gray6};
  padding: 0.5rem;
  ${Sans.style}
`;
