'use client';

import styled from 'styled-components';
import COLORS from '../../styles/colors';
import { BespokeSans } from '../../styles/fonts';

export const Page = styled.main`
  background: ${COLORS.gray1};
`;

export const Title = styled.main`
  color: #000;
  font-family: ${BespokeSans.style.fontFamily};
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: left;
  height: 50px;
`;

export const EventContainer = styled.main`
  margin: auto;
  width: 100%;
  display: flex;
  padding: 16px;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const DateContainer = styled.main`
  width: 10%;
`;

export const EventCardContainer = styled.main`
  width: 65%;
  padding: 16px;
  background: ${COLORS.bread1};
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MonthText = styled.main`
  color: #000;
  text-align: center;
  font-family: ${BespokeSans.style.fontFamily};
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const DateText = styled.main`
  color: #000;
  text-align: center;
  font-family: ${BespokeSans.style.fontFamily};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const TimeText = styled.main`
  color: #000;
  font-family: ${BespokeSans.style.fontFamily};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const EventDescriptionText = styled.main`
  color: #000;
  font-family: ${BespokeSans.style.fontFamily};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const LocationText = styled.main`
  color: ${COLORS.gray10};
  font-family: ${BespokeSans.style.fontFamily};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const EventLogoWrapper = styled.main`
  width: 20%;
  height: 90%;
`;
