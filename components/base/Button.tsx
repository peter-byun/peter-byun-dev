import { KeyboardEventHandler, MouseEvent, useCallback } from 'react';
import { BaseComponentProps } from '../../types/component-types';
import { ButtonAttributes } from '../../types/dom-types';
import { css } from '@emotion/react';
import {
  primaryColor2Active,
  primaryColor2Inactive,
  textActive,
  textSecondary,
} from '../../styles/variables';

type ButtonProps = BaseComponentProps<ButtonAttributes> & {
  custom?: boolean;
  onClick?: (e?: MouseEvent) => void;
};

export const Button = ({
  children,
  className: classNameProp,
  custom,
  onClick,
  ...props
}: ButtonProps) => {
  let className = 'button';
  if (classNameProp) className += ` ${classNameProp}`;

  const baseClass = custom ? 'button-custom' : 'button-base';
  className += ` ${baseClass}`;

  const handleKeyUp = useCallback<KeyboardEventHandler>(
    (e) => {
      if (e.key === 'Enter') onClick?.();
    },
    [onClick]
  );

  return (
    <button
      className={className}
      css={buttonCss}
      onClick={onClick}
      onKeyUp={handleKeyUp}
      {...props}
    >
      {children}
    </button>
  );
};

const buttonCss = css`
  cursor: pointer;

  &.button-base {
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
      box-shadow: 0px 0px 10px 1px ${primaryColor2Active};
    }
  }

  &.button-custom {
    background-color: transparent;
    border: none;
  }
`;
