import { BaseComponentProps } from '../types/component-types';
import { SpanAttributes } from '../types/dom-types';

export const Span = (props: BaseComponentProps<SpanAttributes>) => {
  return <span {...props}>{props.children}</span>;
};
