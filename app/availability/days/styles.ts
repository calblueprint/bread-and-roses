import styled from 'styled-components';
import COLORS from '../../../styles/colors';

export const CalendarContainer = styled.div`
  margin-top: 5rem;
  margin-left: 2rem;
  width: 500px;
  height: 500px;
  cursor: default;
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
    width: 45px;
    height: 45px;
    bottom: 5.5px;
    transform: translateX(11px);
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
    transform: translateX(31px);
    bottom: 125px;
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
