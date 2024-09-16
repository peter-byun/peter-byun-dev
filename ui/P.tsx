import { BaseComponentProps } from '../utils/types/component-types';
import { ParagraphAttributes } from '../utils/types/dom-types';

export const P = (props: BaseComponentProps<ParagraphAttributes>) => {
  return <p {...props}>{props.children}</p>;
};
