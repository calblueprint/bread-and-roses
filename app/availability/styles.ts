import NextImage from 'next/image';
import styled from 'styled-components';
import COLORS from '../../styles/colors';
import { Sans } from '../../styles/fonts';
import { H4, P } from '../../styles/text';

export const AvailabilityDiv = styled.div`
  margin-top: 4rem;
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
`;
export const EventName = styled(P)`
  margin-left: 10%;
  margin-bottom: 0.75rem;
  @media (min-width: 1024px) {
    display: none;
  }
`;
export const Rectangle = styled.div<{
  variant: 'light' | 'dark';
  width: string;
}>`
  width: ${({ width }) => width};
  height: 0.125rem;
  display: inline-block;
  background: ${({ variant }) =>
    variant === 'light' ? COLORS.gray4 : COLORS.gray12};
`;
export const SplitText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const BackButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  float: left;
  width: 0;
`;
export const Asterisk = styled(P)`
  color: ${COLORS.rose11};
`;
export const QuestionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const AnswerContainer = styled.div`
  @media (max-width: 1024px) {
    margin-top: 2rem;
  }
  @media (min-width: 1024px) {
    width: 100%;
    background-color: ${COLORS.bread1};
    border-radius: 8px;
    padding: 2rem;
    gap: 1.75rem;
    box-shadow: 0px 6px 15px -2px rgba(0, 0, 0, 0.08);
    margin: 2rem 0;
  }
`;

export const Title = styled(H4)``;

export const Container = styled.div`
  display: flex;
  overflow-x: hidden;
  flex-direction: column;
  min-height: 100vh;
  margin: 0 auto;
  max-width: 35rem;
  justify-content: space-between;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 5rem;
`;
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  width: 100%;
`;
export const Divider = styled.hr`
  height: 0.125rem;
  background-color: ${COLORS.gray4};
  border: none;
  margin-bottom: 1rem;
  width: 100vw;
  margin-left: -2rem;
  @media (min-width: 1024px) {
    height: 0rem;
  }
`;
export const Image = styled(NextImage)`
  width: 24px;
  height: 24px;
  margin-bottom: 16px;
`;
export const Button = styled.button<{ disabled?: boolean }>`
  bottom: 4.375rem;
  margin-bottom: 2rem;
  width: 100%;
  height: 2.75rem;
  background-color: ${({ disabled }) =>
    disabled ? COLORS.pomegranate10 : COLORS.pomegranate12};
  border-color: ${({ disabled }) =>
    disabled ? COLORS.pomegranate10 : COLORS.pomegranate12};
  border-style: solid;
  border-radius: 8px;
  display: inline-flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  text-decoration: none;
  transition: all 0.3s ease;
  @media (max-width: 1024px) {
    width: 100%;
    bottom: 2.5rem;
  }
`;
export const ContinueText = styled.text`
  ${Sans.style}
  color: white;
  font-size: 0.875rem;
  padding: 0.625rem;
  text-decoration: none;
`;
