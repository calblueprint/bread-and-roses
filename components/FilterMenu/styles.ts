import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { P } from '@/styles/text';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
`;

export const Divider = styled.hr`
  height: 0.0625rem;
  background-color: ${COLORS.gray7};
  border: none;
  width: 100%;
`;

export const IndividualFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Input = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.25rem;

  &::after {
    content: attr(data-label);
    font-size: 0.75rem;
    color: ${COLORS.gray12};
    word-wrap: break-word;
    white-space: normal;
    flex: 1;
  }
`;

export const InputContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  gap: 1rem;
  margin-top: 0.25rem;
  color: ${COLORS.gray10};

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
  }
`;

export const Title = styled(P)`
  font-weight: 500;
  color: ${COLORS.gray12};
  padding-left: 0.125rem;
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  outline: none;
  cursor: pointer;
  height: 0.75rem;
  width: 0.75rem;
  border-radius: 0.125rem;
  border: 1.5px solid ${COLORS.rose10};
  margin-top: 0.125rem;

  &:checked {
    background-color: ${COLORS.rose10};
    border-color: ${COLORS.rose10};
  }
`;
