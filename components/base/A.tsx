import { css } from '@emotion/react';
import {
  primaryColor2Active,
  primaryColor2Inactive,
} from '../../styles/variables';
import { BaseComponentProps } from '../../types/component-types';
import { AnchorAttributes } from '../../types/dom-types';

type AnchorProps = BaseComponentProps<AnchorAttributes>;

const ACss = css`
  color: ${primaryColor2Inactive};
  text-decoration: none;
  cursor: pointer;
  :hover,
  :active {
    color: ${primaryColor2Active};
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
