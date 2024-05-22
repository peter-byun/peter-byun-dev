'use client';

import { css, SerializedStyles } from '@emotion/react';
import { textInput } from '../../styles/mixins';
import { BaseComponentProps } from '../../types/component-types';
import { InputAttributes } from '../../types/dom-types';
import { forwardRef } from 'react';

const inputRootCss = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const inputCss = css`
  ${textInput}
`;

interface InputProps extends BaseComponentProps<InputAttributes> {
  customCss?: SerializedStyles;
  customInputCss?: SerializedStyles;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, children, customCss, customInputCss, ...props }, ref) => {
    return (
      <span css={[inputRootCss, customCss]}>
        <label htmlFor={id}>{children}</label>
        <input {...props} id={id} css={[inputCss, customInputCss]} ref={ref} />
      </span>
    );
  }
);
