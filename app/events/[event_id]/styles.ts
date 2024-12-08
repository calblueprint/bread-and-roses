'use client';

import NextImage from 'next/image';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { H4, H5, P, SMALL } from '@/styles/text';

export const BackImage = styled(NextImage)`
  width: 1.5rem;
  height: 1.5rem;
  z-index: 3;
  margin-top: 1.5rem;
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
  z-index: 1;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.35) 0%,
    rgba(0, 0, 0, 0.35) 100%
  );
`;

export const Page = styled.div`
  flex-direction: column;
  display: flex;
  min-width: 100%;
  min-height: 100svh;
  overflow: hidden;
  @media (max-width: 768px) {
    margin-bottom: 3.75rem;
  }
`;

export const LeftWrapper = styled.div`
  @media (min-width: 768px) {
    width: 50%;
  }
`;

export const RightWrapper = styled.div`
  @media (min-width: 768px) {
    padding-left: 3.875rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    border-left: 1px solid ${COLORS.gray6};
  }
`;

export const Container = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
    margin-left: 1.75rem;
    margin-right: 1.75rem;
  }
  @media (min-width: 768px) {
    margin-left: 9.1875rem;
    margin-right: 5.1875rem;
  }
  justify-content: space-between;
`;

export const Curve = styled.div`
  z-index: 2;
  margin: -1.5rem 0;
  position: relative;
  padding: 0.75rem 2rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    border-radius: 20px 20px 0 0;
  }
  background: ${COLORS.gray1};
`;

export const EventText = styled(H4)`
  font-style: normal;
  line-height: normal;
  margin-top: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${COLORS.gray6};
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
  margin-top: 1rem;
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
  margin-top: 3rem;
  border-bottom: 1px solid ${COLORS.gray6};
  margin-bottom: 0.25rem;
`;

export const ContactsSubHeadingText = styled(SubHeadingText)`
  @media (min-width: 768px) {
    padding-right: 13rem;
    margin-top: 5rem;
  }
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

export const EmailText = styled(P)`
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
`;
