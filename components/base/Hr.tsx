import { css } from '@emotion/react';

export function Hr({ margin }: { margin: string }) {
  return (
    <hr
      css={css`
        background: #8b8b8bc4;

        width: 98%;
        height: 0.5px;

        border: none;
        margin: ${margin ?? 0};
      `}
    ></hr>
  );
}
