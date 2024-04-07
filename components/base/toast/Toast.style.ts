import { css, keyframes } from '@emotion/react';

export type ModalProps = {
  open: boolean;
};

export const dialogStyle = css`
  display: block;
  background: transparent;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  width: 100vw;
  height: 100vh;

  pointer-events: none;
`;
export const contentLayoutStyle = css`
  background-color: transparent;

  position: fixed;
  left: 50%;
  top: 50%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: fit-content;
  min-width: 35vw;
  height: fit-content;

  transform: translate(-50%, -50%);

  p + p {
    margin-top: 5px;
  }
`;

export const contentStyle = css`
  background-color: #eaeaea;

  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-content: center;

  width: 100%;
  padding: 25px;
  margin: 0px;

  border-radius: 50px;

  opacity: 1;
`;

export const TOAST_ANIM_DURATION = 300;
const toastAnimDurationInSec = TOAST_ANIM_DURATION * 0.001;

export const contentAnimation = (isOpen: boolean) => {
  return css`
    animation: ${isOpen ? openAnim : closeAnim} ${toastAnimDurationInSec}s
      ease-in;
  `;
};

const openAnim = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const closeAnim = keyframes`
   from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;
