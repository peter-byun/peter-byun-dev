import './TextArea';

import { BaseComponentProps } from '../../types/component-types';
import { TextAreaAttributes } from '../../types/dom-types';
import { forwardRef } from 'react';

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  BaseComponentProps<TextAreaAttributes>
>(({ ...props }, ref) => {
  return <textarea className="text-area" {...props} ref={ref} />;
});
