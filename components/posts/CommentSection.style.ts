import { css } from '@emotion/react';

import { flexColumnCenter } from '../../styles/mixins';

export const commentContainerCss = css`
  width: 100%;
  padding: 1rem 0;

  :not(:last-child) {
    border-bottom: 1px solid gray;
  }
`;
export const commentWriterCss = css`
  ${flexColumnCenter}
  width: 100%;
  gap: 1rem;

  .viewer-comment-editor {
    width: 100%;

    .text-area {
      width: 100%;
      margin-bottom: 1rem;
    }
  }
`;
export const commentWriterId = css`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  gap: 1rem;
`;
export const commentWriterNameCss = css`
  color: gray;
`;
export const commentBottomCss = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  line-height: 1rem;
`;
