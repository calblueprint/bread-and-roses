'use client';

import NextImage from 'next/image';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { H3, H5, P, SMALL } from '@/styles/text';

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

export const Image = styled(NextImage)`
  width: 20px;
  height: 20px;
  margin-bottom: -2px;
`;

export const BackButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  padding: 0;
`;

export const Title = styled(H3)`
  font-weight: 500;
  margin-top: 1.5rem;
`;

export const Time = styled(P)`
  margin-top: 0.875rem;
`;

export const Location = styled(SMALL)`
  color: ${COLORS.gray10};
  margin-top: 0.375rem;
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

export const About = styled(H5)`
  margin-top: 2.375rem;
  font-weight: 500;
`;

export const AboutText = styled(P)`
  margin-top: 0.5rem;
  font-weight: 400;
`;

export const HostWarningTitle = styled(P)`
  font-weight: 500;
  margin-top: 1.875rem;
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

export const ShowInterest = styled(H5)`
  margin-top: 2.5rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
`;

export const InterestBlock = styled.div`
  padding: 0.75rem 1rem;
  height: 4.5rem;
  border: 1px solid ${COLORS.gray6};
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
`;

export const Select = styled.div`
  border-radius: 4px;
  border: 2px solid ${COLORS.rose10};
  width: 0.875rem;
  height: 0.875rem;
  line-height: 4.5rem;
`;

export const InterestTitle = styled(P)`
  font-weight: 500;
`;

export const TextWithIcon = styled.div`
  display: flex;
  flex-direction: row;
  width: 17.5rem;
  justify-content: space-between;
  align-items: center;
`;

export const SignUp = styled.div`
  background-color: black;
  color: white;
  padding: 0.5rem 1rem;
  margin-left: auto;
  border-radius: 8px;
  width: 5.5rem;
  height: 2.25rem;
  margin-bottom: 10rem;
`;
