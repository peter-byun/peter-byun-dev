import { css } from '@emotion/react';
import { primaryColor2Active, textSecondary } from './variables';

export const indexContentWidth = css`
  width: 45rem;
  max-width: 100%;
`;

export const pageRoot = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  & > * {
    ${indexContentWidth}
  }
`;

export const textInput = css`
  background-color: ${textSecondary};
  padding: 0.5rem;

  border: none;
  border-radius: 5px;

  font-size: 16px;

  transition: box-shadow 0.2s;

  :focus {
    outline: none;
    box-shadow: ${primaryColor2Active} 0px 0px 10px 5px;
    -webkit-appearance: none;
  }
`;

export const flexColumnCenter = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
