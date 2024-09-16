'use client';

import { forwardRef } from 'react';
import { BaseComponentProps } from '../types/component-types';
import { DivAttributes } from '../types/dom-types';
import './Container.css';
import clsx from 'clsx';

type ContainerProps = BaseComponentProps<DivAttributes> & {
  level: 1 | 2 | 3;
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ level = 1, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'container',
          className,
          getContainerColorWithLevel(level)
        )}
        {...props}
      >
        {props.children}
      </div>
    );
  }
);

const CONTAINER_COLORS = {
  1: 'bg-color-1',
  2: 'bg-color-2',
  3: 'bg-color-3',
} as const;

export function getContainerColorWithLevel(
  level: keyof typeof CONTAINER_COLORS
) {
  return CONTAINER_COLORS[level];
}
