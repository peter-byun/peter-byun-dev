import { forwardRef } from 'react';
import { BaseComponentProps } from '../../types/component-types';
import { ButtonAttributes } from '../../types/dom-types';
import { css } from '@emotion/react';
import { bgColor1, bgColor2, bgColor3 } from '../../styles/variables';

type ContainerProps = BaseComponentProps<ButtonAttributes> & {
  level: 1 | 2 | 3;
};

export const ContainerButton = forwardRef<HTMLButtonElement, ContainerProps>(
  ({ level = 1, ...props }, ref) => {
    return (
      <button
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
      </button>
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
