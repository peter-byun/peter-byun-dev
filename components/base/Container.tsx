'use client';

import { forwardRef } from 'react';
import { BaseComponentProps } from '../../types/component-types';
import { DivAttributes } from '../../types/dom-types';
import './Container.css';

type ContainerProps = BaseComponentProps<DivAttributes> & {
  level: 1 | 2 | 3;
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ level = 1, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className="container"
        style={{
          backgroundColor: getContainerColor(level),
        }}
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

export function getContainerColor(level: keyof typeof CONTAINER_COLORS) {
  return `var(--${CONTAINER_COLORS[level]})`;
}
