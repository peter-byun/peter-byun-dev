import { BaseComponentProps } from '../utils/types/component-types';
import { AnchorAttributes } from '../utils/types/dom-types';

type AnchorProps = BaseComponentProps<AnchorAttributes>;

export const A = (props: AnchorProps) => {
  const { children, href } = props;

  return (
    <a href={href} className="a" {...props}>
      {children}
    </a>
  );
};
