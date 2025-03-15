'use client';

import NextImage from 'next/image';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { H3, H5, P } from '@/styles/text';
import { Sans } from '../../../styles/fonts';

interface TagProps {
  $bgColor?: string;
}

export const Container = styled.div`
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 1rem;
`;

export const Body = styled.div`
  margin-left: 1rem;
  margin-right: 1rem;
`;

export const Image = styled(NextImage)<{ $checked?: boolean }>`
  width: 20px;
  height: 20px;
  margin-bottom: -2px;
  filter: ${props =>
    props.$checked
      ? 'invert(6%) sepia(93%) saturate(7093%) hue-rotate(350deg) brightness(85%) contrast(103%)'
      : ''};
`;

export const BackButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  padding: 0;
  cursor: pointer;
`;

export const Title = styled(H3)`
  font-weight: 500;
  margin-top: 1.5rem;
`;

export const TimeDiv = styled.div`
  display: flex;
`;

export const Location = styled(P)`
  margin-top: 0.375rem;
  display: flex;
  align-items: start;
`;

export const CalendarIcon = styled(NextImage)`
  width: 1.25rem;
  height: auto;
  margin-right: 0.5rem;
`;

export const LocationIcon = styled(NextImage)`
  margin-top: 0.125rem;
  width: 1.25rem;
  height: auto;
  margin-right: 0.5rem;
`;

export const IndividualTag = styled.span<TagProps>`
  background-color: ${({ $bgColor }) => $bgColor || 'gray'};
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
`;

export const TagDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  gap: 0.25rem;
`;

export const GroupSizeText = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
`;

export const AcknowledgementText = styled.div`
  margin-left: 0.5rem;
  font-weight: 400;
  display: flex;
  flex-direction: row;
`;

export const Acknowledgement = styled.div`
  margin-top: 2rem;
  display: flex;
`;

export const Preferences = styled(H5)`
  margin-top: 2.375rem;
  font-weight: 500;
`;

export const Divider = styled.hr`
  height: 0.0625rem;
  background-color: ${COLORS.gray4};
  border: none;
  margin-bottom: 1rem;
`;

export const AdditionalInfoText = styled(P)`
  margin-top: 2rem;
  font-weight: 500;
  color: ${COLORS.gray11};
`;

export const HostWarningTitle = styled(P)`
  font-weight: 500;
  margin-top: 1.875rem;
`;

export const HostList = styled.ul`
  list-style-position: inside;
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  color: ${COLORS.gray11};
`;

export const Bullet = styled(P)`
  display: list-item;
  margin-top: 0.375rem;
  margin-left: 1.5rem;
`;

export const FacilityName = styled(P)`
  margin-top: 2.25rem;
  font-weight: 500;
`;

export const Asterisk = styled(P)`
  color: ${COLORS.rose11};
`;

export const ShowInterest = styled(H5)`
  margin-top: 2.5rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
`;

export const InterestBlock = styled.div<{ $checked?: boolean }>`
  border: 1px solid ${props => (props.$checked ? COLORS.rose10 : COLORS.gray6)};
  cursor: pointer;
  padding: 0.75rem 1rem;
  height: 4.5rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
`;

export const Checkbox = styled.input.attrs<{ $checked?: boolean }>({
  type: 'checkbox',
})`
  width: 20px;
  height: 20px;
  border: 2px solid ${COLORS.rose10};
  border-radius: 4px;
  appearance: none;
  outline: none;
  cursor: pointer;

  background-color: ${props => (props.$checked ? COLORS.rose10 : '')};
`;

export const InterestTitle = styled(P)`
  font-weight: 500;
`;

export const TextWithIcon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-grow: 1;
  align-items: center;
`;

export const HostInfo = styled.div`
  display: flex;
  margin-top: 2rem;
  flex-direction: row;
`;

export const SignUp = styled.button`
  background-color: ${COLORS.pomegranate10};
  color: white;
  padding: 0.5rem 0.75rem;
  margin-left: auto;
  width: 5rem;
  height: 2.25rem;
  border: 0;
  border-radius: 0.5rem;
  margin-bottom: 2.5rem;
  margin-top: 4rem;
  cursor: pointer;
  ${Sans.style}
`;

export const SignUpContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 1.875rem;
`;

export const AdditionalInfoInput = styled.textarea`
  height: 7rem;
  font-size: 1rem;
  color: ${COLORS.gray11};
  width: 100%;
  border-radius: 0.5rem;
  border: 0.0625rem solid ${COLORS.gray6};
  padding: 0.5rem;
  margin-top: 0.375rem;
  ${Sans.style}
`;

export const GroupSizeInput = styled.textarea`
  height: 2.25rem;
  font-size: 1rem;
  color: ${COLORS.gray11};
  width: 100%;
  border-radius: 0.5rem;
  border: 0.0625rem solid ${COLORS.gray6};
  padding: 0.375rem;
  margin-top: 0.375rem;
  ${Sans.style}
`;
