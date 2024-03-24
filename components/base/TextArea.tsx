import { css } from '@emotion/react';
import { textInput } from '../../styles/mixins';
import { BaseComponentProps } from '../../types/component-types';
import { TextAreaAttributes } from '../../types/dom-types';
import { forwardRef } from 'react';

const textArea = css`
  resize: none;
  ${textInput}
`;

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  BaseComponentProps<TextAreaAttributes>
>(({ ...props }, ref) => {
  return <textarea className="text-area" css={textArea} {...props} ref={ref} />;
});
