'use client';

import { useEffect, useRef } from 'react';

import {
  contentLayoutStyle,
  contentStyle,
  contentAnimation,
  dialogStyle,
} from './Toast.style';

import Portal from '../portal/Portal';
import { ToastMessage } from './ToastMessage';

type ToastProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  messages: ToastMessage[];
  portalMountingPointId?: string;
};

export const Toast = (props: ToastProps) => {
  const toastRef = useRef<HTMLDialogElement | null>(null);

  useEffect(function onIsOpenChange() {
    if (props.isOpen) {
      toastRef.current?.focus();
    }
  }, []);

  useEffect(function onWindowKeyUp() {
    const handleWindowKeyup = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      props.setIsOpen(false);
    };

    toastRef.current?.addEventListener<'keyup'>('keyup', handleWindowKeyup);

    return () => {
      toastRef.current?.removeEventListener('keyup', handleWindowKeyup);
    };
  }, []);

  return props.isOpen ? (
    <Portal selector="body">
      <dialog css={dialogStyle} ref={toastRef}>
        <article css={[contentLayoutStyle]}>
          {props.messages.map((message) => (
            <p
              key={message.createdAt}
              css={[contentStyle, contentAnimation(!message.isExpired)]}
            >
              {message.content}
            </p>
          ))}
        </article>
      </dialog>
    </Portal>
  ) : null;
};
