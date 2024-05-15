import { css } from '@emotion/react';
import { ReactNode } from 'react';

export function InputError({ children }: { children: ReactNode }) {
  return (
    <div
      css={css`
        color: orange;
      `}
    >
      {children}
    </div>
  );
}
