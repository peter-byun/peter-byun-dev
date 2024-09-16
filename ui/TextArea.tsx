import './TextArea';

import { BaseComponentProps } from '../utils/types/component-types';
import { TextAreaAttributes } from '../utils/types/dom-types';
import { forwardRef } from 'react';

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  BaseComponentProps<TextAreaAttributes>
>(({ ...props }, ref) => {
  return (
    <textarea
      className="input-root text-input text-area"
      {...props}
      ref={ref}
    />
  );
});
