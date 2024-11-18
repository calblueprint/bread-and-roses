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

export const Container = styled.div`
  flex-direction: column;
  overflow: hidden;
  padding: 3rem;
`;

export const Discover = styled(H3)`
  padding-top: 1.5rem;
`;
