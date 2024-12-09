import NextImage from 'next/image';
import styled from 'styled-components';
import COLORS from '../../styles/colors';
import { Sans } from '../../styles/fonts';
import { H4, P } from '../../styles/text';

export const ProgressBarContainer = styled.div`
  width: 100%;
`;

export const EventName = styled(P)`
  margin-left: 10%;
  margin-bottom: 0.75rem;
`;

export const Rectangle = styled.div<{
  variant: 'light' | 'dark';
  width: string;
}>`
  width: ${({ width }) => width};
  height: 2px;
  display: inline-block;
  background: ${({ variant }) =>
    variant === 'light' ? COLORS.gray4 : COLORS.gray12};
`;

export const SplitText = styled.div`
  margin-top: 3rem;
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

export const Title = styled(H4)`
  margin-bottom: 0.5rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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
`;

export const Image = styled(NextImage)`
  width: 20px;
  height: 20px;
  margin-bottom: 16px;
`;

export const Button = styled.button<{ disabled?: boolean }>`
  bottom: 70px;
  margin-left: 10%;
  margin-bottom: 2rem;
  width: 80%;
  height: 2.75rem;
  background-color: ${({ disabled }) =>
    disabled ? COLORS.pomegranate10 : COLORS.pomegranate};
  border-color: ${({ disabled }) =>
    disabled ? COLORS.pomegranate10 : COLORS.pomegranate};
  border-style: solid;
  border-radius: 8px;
  display: inline-flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  text-decoration: none;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 85%;
    bottom: 40px;
  }
`;

export const ContinueText = styled.text`
  ${Sans.style}
  color: white;
  font-size: 14px;
  padding: 10px;
  text-decoration: none;
`;
