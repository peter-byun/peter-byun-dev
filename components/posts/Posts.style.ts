import { css } from '@emotion/react';
import { pageRoot } from '../../styles/mixins';
import { bgColor4, textActive } from '../../styles/variables';

export const searchBoxStyle = css`
  margin-bottom: 10px;
`;
export const searchBoxInputStyle = css`
  width: 100%;
  font-size: 1.2rem;
  padding: 1.2rem;
`;

export const postsRootStyle = css`
  ${pageRoot}
  h1 {
    text-align: left;
  }
`;

export const postItemStyle = css`
  appearance: none;

  color: ${textActive};

  width: 100%;
  max-width: 45rem;

  padding: 0;
  border: none;

  margin-bottom: 10px;

  cursor: pointer;

  transition: background-color 0.2s ease-in-out;
  :hover,
  :active {
    background-color: ${bgColor4};
  }

  h3 {
    margin: 1.2rem;
  }
`;

export const postsNotFoundStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 38rem;
`;
