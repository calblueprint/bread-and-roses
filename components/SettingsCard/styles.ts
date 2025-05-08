'use client';

import NextImage from 'next/image';
import styled from 'styled-components';
import COLORS from '@/styles/colors';
import { Sans } from '@/styles/fonts';
import { H4, P, SMALL } from '@/styles/text';

export const AvailabilityContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1.5rem;
  border-radius: 16px;
  width: 100%;
  background: ${COLORS.bread1};
  margin-bottom: 3rem;
  box-shadow: 0px 6px 15px -2px rgba(0, 0, 0, 0.08);
`;

export const AvailabilityHeader = styled.main`
  display: flex;
  padding: 1.5rem;
  justify-content: space-between;
  align-items: center;
  background: ${COLORS.pomegranate11};
  border-radius: 16px 16px 0 0;
  width: 100%;
`;

export const AvailabilityTitle = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
`;

export const Content = styled.main`
  padding: 0rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Input = styled.input`
  font-family: ${Sans.style.fontFamily};
  font-size: 1rem;
  padding: 0.5rem;
  margin-top: 0.1875rem;
  border: 1px solid ${COLORS.gray6};
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
`;

export const TextArea = styled.textarea`
  font-family: ${Sans.style.fontFamily};
  font-size: 1rem;
  padding: 0.5rem;
  margin-top: 0.1875rem;
  border: 1px solid ${COLORS.gray6};
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
`;

export const RedAsterisk = styled.span`
  color: #b22222;
`;

export const Title = styled(H4)`
  margin-top: 0;
  margin-bottom: 0.5rem;
`;

export const Label = styled(P)`
  color: ${COLORS.gray11};
  font-weight: 500;
`;

export const SubHeader = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: start;
  margin-bottom: 0.25rem;
`;

export const inp = styled.input`
  border: none; /* Remove border */
  background: none; /* Remove background */
  font-size: 1.75rem; /* Same font size as h3 */
  font-weight: bold; /* Same weight as h3 */
  color: inherit; /* Inherit color */
  text-align: left; /* Align text as a heading */
  outline: none; /* Remove outline */
  cursor: default; /* Change cursor to default to indicate it's disabled */
`;

export const SettingDetail = styled.main`
  gap: 0.25rem;
`;

export const SettingListedItems = styled.ul`
  list-style-type: disc;
  list-style-position: outside;
`;

export const NonEditableDisplay = styled.div`
  padding-left: 1.5rem;
`;

export const EditIcon = styled(NextImage)`
  width: 24px;
  height: 24px;
`;

export const EditButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const TruncatedText = styled(SMALL)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: normal;
`;

export const SaveButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.pomegranate12};
  color: ${COLORS.gray1};
  padding: 0.5rem 0.75rem;
  width: 5rem;
  height: 2.25rem;
  border: 0;
  border-radius: 0.5rem;
  margin-top: 1.5rem;
  margin-left: 1rem;
  cursor: pointer;
  font-size: 1rem;
  ${Sans.style}
`;

export const CancelButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: ${COLORS.pomegranate12};
  padding: 0.5rem 0.75rem;
  margin-left: auto;
  width: 5rem;
  height: 2.25rem;
  border: 1px solid ${COLORS.pomegranate12};
  border-radius: 0.5rem;
  margin-top: 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  ${Sans.style}
`;

export const ButtonContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RemoveHostContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RemoveHostButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: ${COLORS.pomegranate12};
  margin-left: auto;
  width: 5rem;
  height: 1.5rem;
  font-size: 0.875rem;
  border: 0.1rem solid ${COLORS.pomegranate12};
  border-radius: 0.5rem;
  cursor: pointer;
  ${Sans.style}
`;
