import styled from 'styled-components';
import { H3, P } from '@/styles/text';
import COLORS from '@/styles/colors';
import NextImage from 'next/image';

export const All = styled.div`
  margin-left:;
`;

export const Page = styled.main<{ $menuExpanded: boolean }>`
  display: flex;
  min-width: 90%;
  min-height: 100vh;
  justify-content: center;
  overflow: hidden;
  margin-left: ${({ $menuExpanded }) =>
    $menuExpanded ? '15%' : '0px'}; /* Adjust margin based on menu expansion */
  transition: margin-left 0.3s ease; /* Smooth transition for menu toggle */
`;

export const SettingDiv = styled.div`
  display: flex;
  margin-top: 4rem;
  width: 30%;
  flex-direction: column;

  @media (max-width: 900px) {
    width: 80%;
  }
`;

export const ProfileName = styled(H3)`
  padding-top: 1.5rem;
  font-weight: 500;
`;

export const Email = styled(P)`
  color: ${COLORS.gray10};
  font-style: normal;
  font-weight: 400;
  margin-top: 0.25rem;
`

export const SignOutButton = styled.button`
  border: 1px solid ${COLORS.pomegranate12};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  width: 7.4rem;
  height: 2.3rem;
  margin-bottom: 2.625rem;
  margin-top: 1rem;
  display: flex;
`;

export const ButtonText = styled(P)`
  font-style: normal;
  font-weight: 400;
  color: ${COLORS.pomegranate12};
`;

export const SignOut = styled(NextImage)`
  width: 20px;
  height: 20px; 
`
