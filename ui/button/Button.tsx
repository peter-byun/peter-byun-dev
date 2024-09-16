'use client';

import './Button.css';
import { clsx } from 'clsx';

import { KeyboardEventHandler, MouseEvent, useCallback } from 'react';
import { BaseComponentProps } from '../../types/component-types';
import { ButtonAttributes } from '../../types/dom-types';
import { ButtonLoadingSpinner } from './ButtonLoadingSpinner';

type ButtonProps = BaseComponentProps<ButtonAttributes> & {
  custom?: boolean;
  isLoading?: boolean;
  onClick?: (e?: MouseEvent) => void;
};

export const Button = ({
  children,
  className: classNameProp,
  custom,
  isLoading,
  onClick,
  ...props
}: ButtonProps) => {
  let className = 'button';
  if (classNameProp) className += ` ${classNameProp}`;

  const baseClass = custom ? 'button-custom' : 'button-base';
  className += ` ${baseClass}`;

  const handleClick = () => {
    if (!isLoading) {
      return;
    }

    onClick?.();
  };

  const handleKeyUp = useCallback<KeyboardEventHandler>(
    (e) => {
      if (e.key === 'Enter') {
        handleClick?.();
      }
    },
    [handleClick]
  );

  const shouldShowLoadingSpinner = isLoading && !custom;

  return (
    <button
      className={clsx(className, 'button-root')}
      onClick={onClick}
      onKeyUp={handleKeyUp}
      {...props}
    >
      {shouldShowLoadingSpinner ? null : children}
      {shouldShowLoadingSpinner ? <ButtonLoadingSpinner /> : null}
    </button>
  );
};
