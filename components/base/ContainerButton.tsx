'use client';
import './Container.css';

import { forwardRef } from 'react';
import { BaseComponentProps } from '../../types/component-types';
import { ButtonAttributes } from '../../types/dom-types';
import { getContainerColor } from './Container';

type ContainerProps = BaseComponentProps<ButtonAttributes> & {
  level: 1 | 2 | 3;
};

export const ContainerButton = forwardRef<HTMLButtonElement, ContainerProps>(
  ({ level = 1, ...props }, ref) => {
    return (
      <button
        ref={ref}
        style={{
          backgroundColor: getContainerColor(level),
        }}
        className="container"
        {...props}
      >
        {props.children}
      </button>
    );
  }
);
