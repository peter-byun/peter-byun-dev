import { css } from '@emotion/react';
import {
  primaryColor3Active,
  primaryColor3Inactive,
} from '../../styles/variables';
import { BaseComponentProps } from '../../types/component-types';
import { AnchorAttributes } from '../../types/dom-types';

type AnchorProps = BaseComponentProps<AnchorAttributes>;

export const ACss = css`
  color: ${primaryColor3Inactive};
  text-decoration: none;
  cursor: pointer;
  :hover,
  :active {
    color: ${primaryColor3Active};
  }
`;

export const A = (props: AnchorProps) => {
  const { children, href } = props;

  return (
    <a href={href} css={ACss} {...props}>
      {children}
    </a>
  );
};
