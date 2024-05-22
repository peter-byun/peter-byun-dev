'use client';

import { forwardRef } from 'react';
import { BaseComponentProps } from '../../types/component-types';
import { DivAttributes } from '../../types/dom-types';
import { css } from '@emotion/react';
import { bgColor1, bgColor2, bgColor3 } from '../../styles/variables';

type ContainerProps = BaseComponentProps<DivAttributes> & {
  level: 1 | 2 | 3;
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ level = 1, ...props }, ref) => {
    return (
      <div
        ref={ref}
        css={[
          containerCss,
          css`
            background-color: ${CONTAINER_COLORS[level]};
          `,
        ]}
        {...props}
      >
        {props.children}
      </div>
    );
  }
);

const containerCss = css`
  padding: 1rem;

  border: none;
  border-radius: 6px;

  cursor: pointer;
`;

const CONTAINER_COLORS = {
  1: bgColor1,
  2: bgColor2,
  3: bgColor3,
} as const;
