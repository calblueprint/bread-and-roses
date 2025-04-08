import styled from 'styled-components';
import COLORS from '../../../styles/colors';
import { Sans } from '../../../styles/fonts';
import { P } from '../../../styles/text';

export const EventName = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 500;
  color: ${COLORS.gray11};
`;

export const EventNameInput = styled.input`
  width: 100%;
  font-size: 1rem;
  padding: 0.5rem;
  margin-top: 0.25rem;
  border-radius: 8px;
  border: 1px solid ${COLORS.gray6};
  ${Sans.style}
  box-sizing: border-box;
`;

export const AdditionalInfo = styled(P)`
  margin-top: 1.875rem;
  font-weight: 500;
  color: ${COLORS.gray11};
`;

export const AdditionalInfoInput = styled.textarea`
  height: 7rem;
  width: 100%;
  font-size: 1rem;
  margin-top: 0.25rem;
  border-radius: 8px;
  border: 1px solid ${COLORS.gray6};
  padding: 0.5rem;
  ${Sans.style}
`;
