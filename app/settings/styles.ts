import NextImage from 'next/image';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { H3, P } from '@/styles/text';

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
`;

export const SignOutButton = styled.button`
  border: 1px solid ${COLORS.pomegranate12};
  cursor: pointer;
  background-color: ${COLORS.gray1};
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  width: 7.5rem;
  height: 2.3rem;
  margin-bottom: 2.625rem;
  margin-top: 1rem;
  display: flex;
`;

export const ButtonText = styled(P)`
  font-style: normal;
  margin-left: 0.5rem;
  font-weight: 400;
  color: ${COLORS.pomegranate12};
`;

export const SignOut = styled(NextImage)`
  width: 1.25rem;
  height: 1.25rem;
`;
