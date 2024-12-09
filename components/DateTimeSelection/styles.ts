import NextImage from 'next/image';
import styled from 'styled-components';
import COLORS from '@/styles/colors';

export const Container = styled.div``;

export const Bar = styled.hr`
  height: 1px;
  color: ${COLORS.gray6};
  background: ${COLORS.gray6};
  font-size: 0;
  border: 0;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
`;

export const Times = styled.div`
  display: flex;
  flex-direction: horizontal;
  gap: 0.5rem;
  align-items: center;
`;

export const AddTime = styled.button`
  all: unset;
  padding-top: 1rem;
  padding-bottom: 1rem;
  cursor: pointer;
`;

export const TimeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Image = styled(NextImage)`
  width: 7px;
  height: 7px;
`;

export const DeleteButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  float: left;
  width: 0;
`;
