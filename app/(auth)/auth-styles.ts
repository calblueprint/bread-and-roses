'use client';

import Image from 'next/image';
import styled from 'styled-components';
import RouterLink from '@/components/RouterLink/RouterLink';
import COLORS from '@/styles/colors';
import { Sans } from '@/styles/fonts';
import { H3, P, SMALL } from '@/styles/text';

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
  margin-top: 0.25rem;
  margin-bottom: 2rem;
  width: ${props => props.width || '4.25rem'};
  height: 0.25rem;
  background-color: ${COLORS.rose9};
`;

export const Logo = styled(Image)`
  margin-bottom: 4rem;
  width: 200px;
  height: auto;
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
  max-width: 25rem;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
`;

export const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label<{ required?: boolean }>`
  font-weight: 500;
  color: ${COLORS.gray11};

  &::after {
    content: ${({ required }) => (required ? "' *'" : "''")};
    color: red;
  }
`;

export const Input = styled.input`
  font-family: ${Sans.style.fontFamily};
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid ${COLORS.gray4};
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 0.25rem;

  &::placeholder {
    color: ${COLORS.gray6};
  }
`;

export const Button = styled.button`
  font-family: ${Sans.style.fontFamily};
  background-color: ${({ disabled }) =>
    disabled ? COLORS.pomegranate10 : COLORS.pomegranate12};
  color: white;
  font-size: 1rem;
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 2rem;
  width: 100%;
  transition: background-color 0.5s ease;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

export const ForgotPassword = styled(SMALL)`
  margin-top: 0.25rem;
  font-weight: 400;
  text-align: right;
`;

export const StyledErrorMessage = styled(SMALL)<{ $isError: boolean }>`
  color: ${({ $isError }) => ($isError ? COLORS.rose11 : 'green')};
  font-weight: 400;
  text-align: left;
  margin-bottom: 1rem;
`;

export const Link = styled(RouterLink)`
  color: ${COLORS.lilac9};
  text-decoration: none;
  background: none;
  border: none;
  font-family: ${Sans.style.fontFamily};
  font-size: inherit;
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

// TODO: Temporarily added to verify that supabase login functionality actually works
export const LoginMessage = styled(SMALL)<{ $isError: boolean }>`
  color: ${({ $isError }) => ($isError ? 'red' : 'green')};
  font-weight: 400;
  text-align: left;
  margin-bottom: 1.5rem;
`;

export const Footer = styled.div`
  font-family: ${Sans.style.fontFamily};
  text-align: center;

  @media (min-width: 1024px) {
    margin-top: 2.625rem;
  }

  @media (max-width: 1024px) {
    margin-top: 2rem;
  }

  width: 100%;
  padding: 0.5rem;
`;

export const Instructions = styled(P)`
  padding-bottom: 1.5rem;
`;

export const AuthSpacer = styled.div`
  margin-top: 0.5rem;
`;

export const FieldError = styled(SMALL)`
  color: ${COLORS.rose11};
  font-weight: 400;
  margin-top: 0.25rem;
`;
