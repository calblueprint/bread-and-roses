'use client';

import NextImage from 'next/image';
import styled from 'styled-components';
import Check from '@/public/images/checkmark.svg';
import COLORS from '@/styles/colors';
import { H3, H5, P } from '@/styles/text';
import { Sans } from '../../../styles/fonts';

interface TagProps {
  $bgColor?: string;
}

export const ImageWrapper = styled.div`
  height: 17.5rem;
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 0 0 0 0;
  background-color: ${COLORS.gray12};
`;

export const Page = styled.div`
  flex-direction: column;
  display: flex;
  overflow: hidden;
  height: 100%;
  @media (max-width: 1024px) {
    margin-bottom: 3.75rem;
  }

  transition:
    margin-left 0.3s ease,
    width 0.3s ease;
`;

export const Curve = styled.div`
  z-index: 2;
  margin: -1.5rem 0;
  position: relative;
  padding: 0.75rem 2rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  @media (max-width: 1024px) {
    border-radius: 20px 20px 0 0;
  }
  background: ${COLORS.bread2};
`;

export const LeftWrapper = styled.div`
  position: relative;
  @media (min-width: 1024px) {
    padding-right: 3.875rem;

    // Vertical divider
    &::after {
      content: '';
      position: absolute;
      top: -4.125rem;
      right: 0;
      height: calc(100% + 8rem);
      width: 1px;
      background-color: ${COLORS.gray6};
      z-index: 100;
    }
  }
`;

export const RightWrapper = styled.div`
  margin-top: 1.188rem;
  @media (min-width: 1024px) {
    padding-left: 3.875rem;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

export const Container = styled.div<{ $column?: boolean }>`
  flex: 1;
  display: grid;
  padding-top: 3.875rem;
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    margin-left: 1.75rem;
    margin-right: 1.75rem;
  }
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: ${({ $column }) => ($column ? '1fr' : '3fr 2fr')};
    place-items: ${({ $column }) => ($column ? 'center' : 'initial')};
    margin-left: 5.1875rem;
    margin-right: 5.1875rem;
    margin-bottom: 2rem;
  }
  justify-content: space-between;
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
  position: relative;
  background-color: transparent;
  border: none;
  outline: none;
  padding: 0;
  cursor: pointer;
`;

export const Title = styled(H3)`
  font-weight: 500;
  margin-top: 1rem;
`;

export const TimeDiv = styled.div`
  display: flex;
`;

export const Location = styled(P)`
  margin-top: 0.375rem;
  display: flex;
  align-items: start;
  font-weight: 400;
  color: ${COLORS.gray12};
`;

export const Icon = styled(NextImage)`
  width: 1rem;
  height: auto;
  margin-right: 0.5rem;
`;

export const LocationIcon = styled(NextImage)`
  margin-top: 0.125rem;
  width: 1rem;
  height: auto;
  margin-right: 0.5rem;
`;

export const IndividualTag = styled.span<TagProps>`
  background-color: ${({ $bgColor }) => $bgColor || 'gray'};
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  font-size: 14px;
  color: ${COLORS.gray12};
`;

export const TagDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem 0;
  gap: 0.25rem;
  flex-wrap: wrap;
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
  margin-bottom: 1rem;
  display: flex;
`;

export const FacilityNotes = styled(H5)`
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
  margin-top: 2rem;
  font-weight: 500;
`;

export const Asterisk = styled(P)`
  color: ${COLORS.rose11};
  font-weight: 400;
`;

export const ShowInterest = styled(H5)`
  margin-top: 2rem;
  font-weight: 500;
`;

export const SelectAllText = styled(P)`
  font-weight: 500;
  margin: 1rem 0;
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
  margin-bottom: 1rem;
`;

export const Checkbox = styled.input.attrs<{ $checked?: boolean }>({
  type: 'checkbox',
})`
  width: 20px;
  height: 20px;
  border: 2px solid ${props => (props.$checked ? COLORS.rose10 : COLORS.gray10)};
  border-radius: 4px;
  appearance: none;
  outline: none;
  cursor: pointer;

  clip-path: ${props =>
    props.$checked
      ? 'polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%)'
      : ''};
  background-color: ${props => (props.$checked ? COLORS.rose10 : '')};

  // Add checkmark
  &::before {
    content: '';
    display: ${props => (props.$checked ? 'inline-block' : 'none')};
    position: absolute;
    width: 16px;
    height: 16px;
    // Center checkmark
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url(${Check.src});
    background-position: center;
  }
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
  margin-top: 1rem;
  cursor: pointer;
  ${Sans.style}
`;

export const SignUpContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
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

export const ConfirmationWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin: 4rem auto;
  max-width: 30rem;
`;

export const BreadImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85px;
  height: 85px;
  z-index: 2;
`;

export const ConfirmationContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.bread1};
  justify-content: center;
  align-items: start;
  gap: 1.5rem;
  padding: 3.25rem 2rem 2rem 2rem;
  border-radius: 1rem;
  border: 1px solid ${COLORS.gray2};
  box-shadow: 0px 6px 15px -2px rgba(0, 0, 0, 0.08);
`;
export const ConfirmationTitle = styled(H5)`
  font-weight: 500;
`;

export const ConfirmationBodyText = styled(P)`
  font-weight: 400;
`;

export const ConfirmationButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 0.5rem;
  width: 100%;
  padding: 0.5rem;
  background-color: ${COLORS.pomegranate12};
  cursor: pointer;
`;

export const ConfirmationButtonText = styled(P)`
  color: ${COLORS.gray1};
  font-weight: 400;
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0rem;
`;

export const CancelButton = styled.button`
  display: flex;
  padding: 0.5rem 0.75rem;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: ${COLORS.pomegranate10};
  border-radius: 0.5rem;
  margin-top: 2rem;
  align-self: flex-start;
  border: 0;
  cursor: pointer;
  margin-left: auto;
  max-width: 28rem;
`;

export const RemoveConfirmation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 2rem;
  line-height: normal;
  margin-left: auto;
`;
