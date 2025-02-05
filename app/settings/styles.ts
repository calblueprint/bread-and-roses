import styled from 'styled-components';

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
