import { css } from '@emotion/react';
import {
  primaryColor2Active,
  primaryColor2Inactive,
  textActive,
  textSecondary,
} from '../../../styles/variables';

export const buttonStyle = css`
  cursor: pointer;
  transition: background-color 0.4s cubic-bezier(0.075, 0.82, 0.165, 1);

  &.button-base {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    background-color: ${primaryColor2Inactive};
    color: ${textSecondary};

    width: 100%;
    padding: 1rem 0.5rem;
    border: none;
    border-radius: 8px;

    font-size: 1.2rem;

    transition:
      background-color 0.2s,
      color 0.2s,
      box-shadow 0.2s;

    &:hover,
    &:focus {
      background-color: ${primaryColor2Active};
      color: ${textActive};
      box-shadow: 0px 0px 8px 1px ${primaryColor2Active};
    }
  }

  &.button-custom {
    background-color: transparent;
    border: none;
  }

  &.button-loading {
  }
`;
