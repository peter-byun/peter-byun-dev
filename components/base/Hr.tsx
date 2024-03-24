import { css } from '@emotion/react';

export function Hr() {
  return (
    <hr
      css={css`
        background: #8b8b8bc4;

        width: 98%;
        height: 0.5px;

        border: none;
      `}
    ></hr>
  );
}
