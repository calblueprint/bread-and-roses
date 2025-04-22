import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { P } from '@/styles/text';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
  cursor: pointer;

  &::after {
    content: attr(data-label);
    font-size: 0.875rem;
    color: ${COLORS.gray12};
    overflow-wrap: break-word;
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

export const ApplyButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 0.5rem;
  width: 100%;
  padding: 0.5rem;
  background-color: ${COLORS.pomegranate12};
  cursor: pointer;
`;

export const ClearButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.0625rem solid ${COLORS.pomegranate12};
  border-radius: 0.5rem;
  width: 100%;
  padding: 0.5rem;
  background-color: ${COLORS.gray2};
  cursor: pointer;
`;

export const ApplyButtonText = styled(P)`
  color: ${COLORS.gray1};
  font-weight: 400;
`;

export const ClearButtonText = styled(P)`
  color: ${COLORS.pomegranate12};
  font-weight: 400;
`;
