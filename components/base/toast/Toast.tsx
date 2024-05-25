'use client';

import './Toast.css';

import { useEffect, useRef } from 'react';
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
      <dialog className="toast dialog" ref={toastRef}>
        <article className="content-layout">
          {props.messages.map((message) => (
            <p
              key={message.createdAt}
              className="toast-content"
              style={{
                animation: createAnim(!message.isExpired),
              }}
            >
              {message.content}
            </p>
          ))}
        </article>
      </dialog>
    </Portal>
  ) : null;
};

export const TOAST_ANIM_DURATION = 300;
function createAnim(isOpen: boolean) {
  const toastAnimDurationInSec = TOAST_ANIM_DURATION * 0.001;

  return `${isOpen ? 'open' : 'close'} ${toastAnimDurationInSec}s
  ease-in;`;
}
