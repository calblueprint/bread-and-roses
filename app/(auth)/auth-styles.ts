import Image from 'next/image';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { Sans } from '@/styles/fonts';
import { H3, P } from '@/styles/text';

interface TitleUnderlineProps {
  width?: string;
}

export const Container = styled.div`
  font-family: ${Sans.style.fontFamily}, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
`;

export const TitleUnderline = styled.div<TitleUnderlineProps>`
  margin-top: -0.25rem;
  margin-bottom: 0.25rem;
  width: ${props => props.width || '68px'};
  height: 4px;
  background-color: ${COLORS.rose8};
`;

export const Logo = styled(Image)`
  margin-bottom: 4rem;
`;

export const Header = styled(H3)`
  margin-bottom: 1rem;
  text-align: center;
`;

export const Card = styled.div`
  background-color: ${COLORS.bread1};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  gap: 0.5rem;
`;

export const Label = styled(P)`
  font-family: ${Sans.style.fontFamily};
  font-weight: 500;
  margin-top: 1.25rem;
  margin-bottom: -0.2rem;
`;

export const Input = styled.input`
  font-family: ${Sans.style.fontFamily};
  padding: 0.7rem;
  border: 1px solid ${COLORS.gray4};
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
`;

export const Button = styled.button`
  font-family: ${Sans.style.fontFamily};
  background-color: ${COLORS.pomegranate};
  color: white;
  font-size: 1rem;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1.5rem;
  width: 100%;
`;

export const Link = styled.a`
  color: ${COLORS.lilac9};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// TODO: Temporarily added to verify that supabase login functionality actually works
export const LoginMessage = styled(P)<{ isError: boolean }>`
  font-family: ${Sans.style.fontFamily};
  color: ${({ isError }) => (isError ? 'red' : 'green')};
  text-align: center;
  margin-top: 0.5rem;
`;

export const Footer = styled.div`
  font-family: ${Sans.style.fontFamily};
  text-align: center;
  margin-top: 1rem;
  width: 100%;
  padding: 0.5rem;
`;

export const Instructions = styled(P)`
  padding-top: 1rem;
`;
