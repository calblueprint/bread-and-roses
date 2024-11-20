'use client';

import NextImage from 'next/image';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { H4, H5, P, SMALL } from '@/styles/text';

export const BackImage = styled(NextImage)`
  position: absolute;
  top: 0;
  left: 0;
  width: 1.5rem;
  height: 1.5rem;
  margin: 1rem;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
`;

export const EventImage = styled(NextImage)`
  width: 100%;
  height: auto;
  max-height: 11.5rem;
  object-fit: cover;
`;

export const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.35) 0%,
    rgba(0, 0, 0, 0.35) 100%
  );
`;

export const Page = styled.div`
  flex-direction: column;
  min-width: 100%;
  min-height: 100svh;
  overflow: hidden;
  margin-bottom: 3.75rem;
`;

export const Container = styled.div`
  padding-left: 1.75rem;
  padding-right: 1.75rem;
  display: flex;
  flex-direction: column;
`;

export const Curve = styled.div`
  z-index: 10;
  margin: -1.5rem 0;
  position: relative;
  padding: 0.75rem 2rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  border-radius: 20px 20px 0 0;
  background: ${COLORS.gray1};
`;

export const EventText = styled(H4)`
  font-style: normal;
  line-height: normal;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
`;

export const CalLocPin = styled(NextImage)`
  width: 1.125rem;
  height: auto;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const DateLocation = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: left;
`;

export const ParaText = styled(P)`
  font-style: normal;
  line-height: normal;
  align-items: flex-end;
  justify-content: left;
`;

export const LocationDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SubHeadingText = styled(H5)`
  padding-top: 2.5rem;
  border-bottom: 1px solid ${COLORS.gray6};
  padding-bottom: 0.25rem;
`;

export const AllNotesAndContactsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
`;
export const ContactPins = styled(NextImage)`
  width: 2rem;
  height: auto;
`;

export const ContactContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 0.75rem;
`;

export const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContactTypeText = styled(SMALL)`
  font-style: italic;
`;

export const PhoneNumberText = styled(P)`
  padding-top: 0.125rem;
`;
