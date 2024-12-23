import styled from 'styled-components';
import { H3 } from '@/styles/text';

export const EventListingDiv = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  scrollbar-width: none;
  gap: 1.5rem;
  display: flex;
  &::-website-scrollbar {
    display: none;
  }
`;

export const SearchBar = styled.div`
  width: 100%;
  height: 2.25rem;
  line-height: 2.25rem;
  padding-left: 1rem;
  border-radius: 0.5rem;
  background-color: #d9d9d940;
  margin-top: 1.25rem;
`;

export const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  margin-bottom: 0.25rem;
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

export const DiscoverHolder = styled.main`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 2rem;
  box-sizing: border-box;
`;

export const Discover = styled(H3)`
  padding-top: 1.5rem;
`;
