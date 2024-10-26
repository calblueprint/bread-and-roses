'use client';

import styled from 'styled-components';

export const UpdateContainer = styled.main`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 0.5rem;
`;

export const Checkbox = styled.input`
  width: 25px;
  height: 25px;
  border-style: solid;
`;

export const UpdateText = styled.text`
  text-align: left;
  margin-left: 15px;
`;

export const RedAsterisk = styled.span`
  color: #b22222;
`;
