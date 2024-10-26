import styled from 'styled-components';
import COLORS from '../../styles/colors';
import { BespokeSans } from '../../styles/fonts';
import { H3, P } from '../../styles/text';

export const Container = styled.div`
  font-family: ${BespokeSans.style.fontFamily}, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${COLORS.gray2};
  padding: 1rem;
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
  font-family: ${BespokeSans.style.fontFamily};
  font-weight: 500;
  margin-bottom: -0.2rem;
`;

export const Input = styled.input`
  font-family: ${BespokeSans.style.fontFamily};
  padding: 0.7rem;
  border: 1px solid ${COLORS.gray4};
  border-radius: 8px;
  width: 100%;
  margin-bottom: 0.6rem;
  box-sizing: border-box;
`;

export const Button = styled.button`
  font-family: ${BespokeSans.style.fontFamily};
  background-color: ${COLORS.gray12};
  color: white;
  font-size: 1rem;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 0.8rem;
  width: 100%;
`;

export const GoogleButton = styled(Button)`
  background-color: ${COLORS.bread1};
  color: ${COLORS.gray12};
  font-size: 1rem;
  // TODO: Update to COLORS.black if that gets added
  border: 1px solid #000000;
  margin-top: 0rem;
`;

export const Separator = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 0.2rem;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${COLORS.gray5};
  }

  span {
    margin: 0 0.5rem;
    color: ${COLORS.gray7};
  }
`;

export const Link = styled.a`
  font-family: ${BespokeSans.style.fontFamily};
  // TODO: CHANGE COLOR TO BLUE ONCE COLORS.TS IS UPDATED
  color: #3978ff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const SmallBuffer = styled.div`
  height: 0.5rem;
`;

// TODO: Temporarily added to verify that supabase login functionality actually works
export const LoginMessage = styled(P)<{ isError: boolean }>`
  font-family: ${BespokeSans.style.fontFamily};
  color: ${({ isError }) => (isError ? 'red' : 'green')};
  text-align: center;
  margin-top: 0.5rem;
`;

export const Footer = styled.div`
  font-family: ${BespokeSans.style.fontFamily};
  text-align: center;
  margin-top: 1rem;
  width: 100%;
  padding: 0.5rem;
`;
