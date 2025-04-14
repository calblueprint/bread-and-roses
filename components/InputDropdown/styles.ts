import {
  ClearIndicatorProps,
  ControlProps,
  CSSObjectWithLabel,
  DropdownIndicatorProps,
  OptionProps,
  StylesConfig,
} from 'react-select';
import styled, { keyframes } from 'styled-components';
import COLORS from '@/styles/colors';
import { H6 } from '@/styles/text';
import { DropdownOption } from '@/types/schema';

export const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const fadeInKeyframes = keyframes`
  from {
    opacity: 0;
    transform: translateY(-0.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const AnimatedWrapper = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  background: white;
  z-index: 999;
  animation: 80ms ${fadeInKeyframes} cubic-bezier(0, 0, 0.35, 1) forwards;
`;

const getControlBorderColor = (
  hasValue: boolean,
  inFocus: boolean,
  error?: boolean,
) => {
  if (error) return COLORS.rose10;
  if (inFocus) return COLORS.gray11;
  return COLORS.gray6;
};

export const DropdownStyles = (
  multi?: boolean,
  error?: boolean,
): StylesConfig<DropdownOption> => ({
  noOptionsMessage: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    padding: '0.3125rem 0',
  }),
  dropdownIndicator: (
    baseStyles: CSSObjectWithLabel,
    state: DropdownIndicatorProps<DropdownOption>,
  ) => ({
    ...baseStyles,
    transition: '200ms ease-in-out',
    color: COLORS.gray12,
    position: 'relative',
    '::before': {
      content: '""',
      position: 'absolute',
      left: '-8px',
      height: '100%',
      width: '1px',
      backgroundColor: COLORS.gray6,
      transform: 'none',
    },
    svg: {
      transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : '',
      transition: '200ms ease-in-out',
    },
  }),
  clearIndicator: (
    baseStyles: CSSObjectWithLabel,
    state: ClearIndicatorProps<DropdownOption, boolean>,
  ) => ({
    ...baseStyles,
    cursor: 'default',
    display: multi || state.selectProps.required ? 'none' : 'flex',
    position: 'relative',
    left: '-13px',
    color: COLORS.gray6,
    ':hover': {
      color: COLORS.gray10,
    },
  }),
  multiValueLabel: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    fontSize: '0.875rem',
    padding: '0.125rem, 0',
  }),
  multiValue: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    background: COLORS.lilac2,
    cursor: 'default',
    padding: '4px 8px',
    borderRadius: '8px',
    margin: '0.25rem 0.5rem 0.25rem 0',
  }),
  multiValueRemove: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    padding: '0 0.25rem',
    marginLeft: '0.25rem',
    cursor: 'pointer',
    ':hover': {
      background: 'rgba(0, 0, 0, 0.1)',
    },
  }),
  placeholder: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    color: COLORS.gray6,
  }),
  control: (
    baseStyles: CSSObjectWithLabel,
    state: ControlProps<DropdownOption>,
  ) => ({
    ...baseStyles,
    cursor: 'text',
    color: COLORS.gray12,
    minHeight: '2.9375rem',
    padding: '4px 8px',
    borderRadius: '0.313rem',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: getControlBorderColor(state.hasValue, state.isFocused, error),
    background: state.selectProps.isDisabled ? COLORS.gray3 : 'white',
  }),
  menu: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    background: COLORS.bread1,
    boxShadow: '0 2px 0.25rem 0.1rem rgba(0, 0, 0, 0.25)',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    borderColor: COLORS.rose7,
    borderWidth: '1.5px',
    borderStyle: 'solid',
  }),
  menuList: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    padding: '0.2rem 0.3rem',
    margin: '2px',
    overflowY: 'auto',
    '::-webkit-scrollbar': {
      width: '7px',
      height: '8px',
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: COLORS.rose7,
      borderRadius: '4px',
    },
    '::-webkit-scrollbar-thumb:hover': {
      backgroundColor: COLORS.rose8,
    },
    '::-webkit-scrollbar-track': {
      backgroundColor: COLORS.bread1,
    },
  }),
  option: (
    baseStyles: CSSObjectWithLabel,
    state: OptionProps<DropdownOption>,
  ) => ({
    ...baseStyles,
    position: 'relative',
    color: COLORS.gray12,
    borderRadius: '0.25rem',
    padding: '0.5rem',
    paddingLeft: multi ? '2rem' : '1rem',
    fontSize: '0.875rem',
    backgroundImage: state.isSelected
      ? `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 17' fill='none' %3E%3Crect x='0.5' y='1' width='15' height='15' rx='2.5' fill='%2391000F' stroke='%2391000F' /%3E %3Cpath d='M6.17794 10.8117L3.80728 8.32401L3 9.16517L6.17794 12.5L13 5.34116L12.1984 4.5L6.17794 10.8117Z' fill='white' /%3E %3C/svg%3E")`
      : `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 17' fill='none' %3E%3Crect x='0.5' y='1' width='15' height='15' rx='2.5' stroke='%2391000F' stroke-width='1.5' /%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: multi ? '1rem 1rem' : '0',
    backgroundPosition: 'left 0.5rem center',
    transition: '150ms',
    cursor: 'pointer',
    '::before': {
      content: '""',
      background: state.isSelected ? COLORS.rose3 : COLORS.rose2,
      width: '100%',
      height: 'calc(100% - 0.25rem)',
      borderRadius: '0.25rem',
      top: 0,
      left: 0,
      position: 'absolute',
      transform: 'translateY(0.1rem)',
      zIndex: -1,
      opacity: state.isSelected || state.isFocused ? 1 : 0,
    },
  }),
});

export const InputLabel = styled(H6)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 0.2rem;
`;
