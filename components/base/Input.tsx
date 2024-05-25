'use client';

import './Input.css';

import { BaseComponentProps } from '../../types/component-types';
import { InputAttributes } from '../../types/dom-types';
import { forwardRef } from 'react';

type InputProps = BaseComponentProps<InputAttributes>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, children, ...props }, ref) => {
    return (
      <span className="input-root">
        <label htmlFor={id}>{children}</label>
        <input {...props} id={id} className="input text-input" ref={ref} />
      </span>
    );
  }
);
