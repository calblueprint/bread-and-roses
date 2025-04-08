import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { P } from '@/styles/text';

export const EditButton = styled.button`
  all: unset;
  cursor: pointer;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const EditText = styled(P)`
  color: ${COLORS.lilac9};
  font-weight: 400;
`;

export const AvailabilityDiv = styled.div`
  margin-top: 4rem;
`;

export const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5 rem;
`;

export const Divider = styled.hr`
  height: 0.0625rem;
  background-color: ${COLORS.gray7};
  border: none;
  margin-bottom: 1rem;
`;
export const TipText = styled(P)`
  margin-bottom: 3rem;
`;
export const BulletedList = styled.ul`
  color: ${COLORS.gray11};
  margin-left: 2rem;
`;
export const GradientDivider = styled.hr`
  margin-top: 4rem;
  height: 0.0625rem;
  border: none;
  margin-bottom: 1rem;
  background: linear-gradient(
    90deg,
    rgba(184, 184, 184, 0) 0%,
    #b8b8b8 50%,
    rgba(184, 184, 184, 0) 100%
  );
`;
