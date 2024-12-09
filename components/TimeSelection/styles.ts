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
    padding: 0 15px;
    font-size: 13px;
    line-height: 1;
    height: 35px;
    gap: 5px;
    background-color: white;
    color = ${COLORS.gray11};
    border: 1px solid ${COLORS.gray8};
  }

  .SelectTrigger:hover {
    background-color: ${COLORS.rose5};
  }

  .SelectItem[data-disabled] {
    pointer-events: none;
  }

  .SelectLabel {
    padding: 0 25px;
    font-size: 12px;
    line-height: 25px;
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
    height: 25px;
    background-color: white;
    color: var(--violet-11);
    cursor: default;
  }

  .SelectItem {
    font-size: 13px;
    line-height: 1;
    color: black;
    border-radius: 8px;
    display: flex;
    align-items: center;
    height: 30px;
    padding: 0 25px 0 25px;
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
    padding: 5px;
  }

  .SelectItemIndicator {
    position: absolute;
    left: 0;
    width: 25px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`;
