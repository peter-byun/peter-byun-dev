'use client';

import './Input.css';

import { BaseComponentProps } from '../../types/component-types';
import { InputAttributes } from '../../types/dom-types';
import { forwardRef } from 'react';
import clsx from 'clsx';

type InputProps = BaseComponentProps<InputAttributes>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, children, className, ...props }, ref) => {
    return (
      <span className="input-root">
        <label htmlFor={id}>{children}</label>
        <input
          {...props}
          id={id}
          className={clsx('input text-input', className)}
          ref={ref}
        />
      </span>
    );
  }
);
