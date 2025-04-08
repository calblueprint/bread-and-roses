import styled from 'styled-components';
import COLORS from '../../../styles/colors';

export const CalendarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Calendar = styled.div`
  margin-top: 2.5rem;
  width: 20rem;
  height: 20rem;
  cursor: default;
  @media(min-width: 1024px) {
    width: 30rem;
    height: 30rem;
    background-color: ${COLORS.bread1};
    border-radius: 8px;
    padding: 2rem;
    gap: 1.75rem;
    box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.15);
    margin: 2.625rem 0;
    }
  .fc-prev-button,
  .fc-next-button {
    background: none;
    border: none;
    color: black;
    box-shadow: none;
  }
  .fc-prev-button:hover,
  .fc-next-button:hover {
    background-color: lightgray;
    cursor: pointer;
  }
  .fc-highlight {
    background-color: transparent;
  }
  .selected-date {
    position: relative;
  }
  .cur-selected::after {
    background-color: ${COLORS.bread5} !important;
  }
  .non-cur-selected::after {
    background-color: ${COLORS.bread3} !important;
  }
  .selected-date::after {   
    content: '';
    position: absolute;
    width: 28px;
    height: 28px;
    bottom: 4px;
    transform: translateX(6px);
    @media(min-width: 1024px) {
      width: 36px;
      height: 36px;
      bottom: 5px;
      transform: translateX(10px);
      
    }
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    z-index: -1;
  }
  .unselectable {
    color: ${COLORS.gray8}} !important;
  }
  .fc-day-past div {
    opacity: 1 !important;
  }
  .fc-day-future div {
    opacity: 1 !important;
  }
  .fc-day-today {
    background-color: transparent !important;
  }
  .fc-day-today::after {
    content: '';
    position: absolute;
    transform: translateX(18px);
    bottom: 141px;
    @media(min-width: 1024px) {
      bottom: 192px;
      transform: translateX(24px);
    }
    width: 4px; /* Diameter of the dot */
    height: 4px; /* Diameter of the dot */
    background-color: ${COLORS.rose11}; /* Color of the dot */
    border-radius: 50%; /* Makes the element a circle */
  }
  .fc-daygrid-day-frame {
    display: flex;
    justify-content: center;
  }
  .fc-daygrid-day-top {
    align-items: center;
  }
  .fc td,
  .fc table,
  .fc th {
    border-style: none !important;
  }
`;
