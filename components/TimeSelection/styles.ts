import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const Container = styled.div`
  button {
    all: unset;
  }

  .SelectTrigger {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    padding: 0 0.9375rem;
    font-size: 0.8125rem;
    line-height: 1;
    height: 2.1875rem;
    gap: 0.3125rem;
    background-color: white;
    color = ${COLORS.gray11};
    border: 0.0625rem solid ${COLORS.gray8};
  }

  .SelectTrigger:hover {
    background-color: ${COLORS.rose5};
  }

  .SelectItem[data-disabled] {
    pointer-events: none;
  }

  .SelectLabel {
    padding: 0 1.5625rem;
    font-size: 0.75rem;
    line-height: 1.5625rem;
    color = ${COLORS.gray8};
  }
`;

export const Content = styled.div`
  .Scroll {
    overflow-y: scroll;
    background-color: white;
    border: 1px solid ${COLORS.rose7};
    border-radius: 8px;
    box-shadow:
      0px 10px 38px -10px rgba(22, 23, 24, 0.35),
      0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  }

  .ScrollViewPort {
    width: 100%;
    height: 100%;
  }
    
  .SelectScrollButton {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.5625rem;
    background-color: white;
    color: var(--violet-11);
    cursor: default;
  }

  .SelectItem {
    font-size: 0.8125rem;
    line-height: 1;
    color: black;
    border-radius: 8px;
    display: flex;
    align-items: center;
    height: 1.875rem;
    padding: 0 1.5625rem 0 1.5625rem;
    position: relative;
    user-select: none;
    color = ${COLORS.gray11};
  }
    
  .SelectItem[data-highlighted] {
    outline: none;
    background-color: ${COLORS.rose5};
    cursor: default;
  }

  .SelectViewport {
    padding: 0.3125rem;
  }

  .SelectItemIndicator {
    position: absolute;
    left: 0;
    width: 1.5625rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;
