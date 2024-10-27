import styled from 'styled-components';
import COLORS from '@/styles/colors';
import Image from 'next/image';
import { Sans } from '@/styles/fonts';
import { P } from '@/styles/text';

export const MenuContainer = styled.div<{ $expanded: boolean }>`
  height: 100vh;
  background-color: ${({ $expanded }) => ($expanded ? COLORS.pomegranate : 'transparent')};
  display: flex;
  flex-direction: column;
  padding-left: 1.25rem;
  gap: 1.5rem;
  transition: width 0.3s ease, background-color 0.3s ease;
  position: fixed;

  width: ${({ $expanded }) => ($expanded ? '20%' : '0')};

  @media (max-width: 768px) { 
    width: ${({ $expanded }) => ($expanded ? '75%' : '0')};
  }
`;

export const ToggleButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  padding: 1rem 0;
`;

export const MenuItem = styled.button<{ $expanded: boolean }>`
  width: 100%;
  background-color: transparent;
  border-style: solid;
  border-color: transparent;
  color: ${COLORS.gray3};
  display: flex;
  align-items: center;
  justify-content: ${({ $expanded }) => ($expanded ? 'flex-start' : 'center')};
  cursor: pointer;
`;

export const MenuIconWrapper = styled.div<{ $expanded: boolean }>`
  width: 20px;
  height: 20px;

  & svg path {
    fill: ${({ $expanded }) => ($expanded ? COLORS.gray3 : COLORS.pomegranate)};
  }
`;

export const Icon = styled(Image)`
  width: 20px;
  height: 20px;
  margin-right: 0.625rem;
`;

export const MenuLabel = styled(P)<{ $expanded: boolean; $active: boolean }>`
  ${Sans.style}
  color: ${COLORS.gray3};
  display: ${({ $expanded }) => ($expanded ? 'flex' : 'none')};
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  transition: font-weight 0.03s ease-in-out;
`;
