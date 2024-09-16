'use client';
import './Container.css';

import { forwardRef } from 'react';
import { BaseComponentProps } from '../utils/types/component-types';
import { ButtonAttributes } from '../utils/types/dom-types';
import { getContainerColorWithLevel } from './Container';
import clsx from 'clsx';

type ContainerProps = BaseComponentProps<ButtonAttributes> & {
  level: 1 | 2 | 3;
};

export const ContainerButton = forwardRef<HTMLButtonElement, ContainerProps>(
  ({ level = 1, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'container',
          getContainerColorWithLevel(level),
          className
        )}
        {...props}
      >
        {props.children}
      </button>
    );
  }
);
