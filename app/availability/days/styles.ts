import styled from 'styled-components';
import { P, SMALL } from '@/styles/text';
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
    box-shadow: 0px 6px 15px -2px rgba(0, 0, 0, 0.08);
    margin-top: 2.625rem;
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
    transform: translateX(18px);
    bottom: 142px;
    @media(min-width: 1024px) {
      bottom: 147px;
      transform: translateX(25px);
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

export const NoDaysContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 4.31rem;
`;

export const NoDaysText = styled(P)`
  color: ${COLORS.gray11};
  font-weight: 400;
  font-style: italic;
`;

export const SelectedDaysContainer = styled.div`
  padding: 2rem;
`;

export const SelectedList = styled.ul`
  padding-left: 1.5rem;
  margin: 0;
`;

export const SelectedTitle = styled(SMALL)`
  color: ${COLORS.gray11};
  font-weight: 400;
  padding-left: 0;
  margin-bottom: 0.25rem;
`;
