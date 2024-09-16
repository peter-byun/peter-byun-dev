import { BaseComponentProps } from '../utils/types/component-types';
import { HeadingAttributes } from '../utils/types/dom-types';

type HeadingProps = BaseComponentProps<HeadingAttributes> & {
  level: number;
};

export const H = (props: HeadingProps) => {
  return (
    <>
      {props.level === 1 ? (
        <h1 {...props}>{props.children}</h1>
      ) : props.level === 2 ? (
        <h2 {...props}>{props.children}</h2>
      ) : (
        <h3 {...props}>{props.children}</h3>
      )}
    </>
  );
};
