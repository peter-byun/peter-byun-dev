import { BaseComponentProps } from '../../types/component-types';
import { ParagraphAttributes } from '../../types/dom-types';

export const P = (props: BaseComponentProps<ParagraphAttributes>) => {
  return <p {...props}>{props.children}</p>;
};
