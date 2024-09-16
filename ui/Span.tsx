import { BaseComponentProps } from '../utils/types/component-types';
import { SpanAttributes } from '../utils/types/dom-types';

export const Span = (props: BaseComponentProps<SpanAttributes>) => {
  return <span {...props}>{props.children}</span>;
};
