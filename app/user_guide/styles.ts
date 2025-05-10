import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { H5, P } from '@/styles/text';

export const Title = styled(H5)`
  font-weight: 500;
`;

export const Header = styled(P)`
  font-weight: 500;
  margin-top: 1.5rem;
`;

export const Text = styled(P)`
  font-weight: 400;
  margin-top: 0.5rem;
  color: ${COLORS.gray11};
`;

export const Divider = styled.hr`
  height: 0.0625rem;
  background-color: ${COLORS.gray7};
  border: none;
  margin-top: 0.125rem;
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

export const Guide = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  width: 75%;
  max-width: 35rem;
  gap: 3rem;
  border-radius: 16px;
  border: 1px solid ${COLORS.gray2};
  background: ${COLORS.bread1};
  /* shadow-md */
  box-shadow: 0px 6px 15px -2px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  margin-bottom: 4rem;
`;
