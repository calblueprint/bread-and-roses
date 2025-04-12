import NextImage from 'next/image';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { H4, P, SMALL } from '@/styles/text';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5rem 2rem 0;
`;

export const EditButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const EditIcon = styled(NextImage)`
  width: 24px;
  height: 24px;
  padding: 0.1875rem;
`;

export const TextContainer = styled.div`
  display: flex;
  color: ${COLORS.gray12};
  flex-direction: column;
  gap: 1.5rem;
`;

export const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5 rem;

  @media (min-width: 1024px) {
    width: 30rem;
    margin-left: auto;
    margin-right: auto;
  }
  margin-bottom: 5rem;
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

export const Title = styled(H4)`
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

export const AvailabilityContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-top: 1rem;
  padding-left: 1rem;
`;

export const AvailabilityRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;

export const DayColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TimeColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Weekday = styled(SMALL)`
  font-weight: 500;
  color: ${COLORS.gray12};
`;

export const MonthDay = styled(SMALL)`
  font-weight: 400;
  color: ${COLORS.gray12};
`;

export const Times = styled(P)`
  font-weight: 400;
  color: ${COLORS.gray11};
`;
