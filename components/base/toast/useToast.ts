import { ReactNode, useState } from 'react';
import { ToastMessage } from './ToastMessage';
import { TOAST_ANIM_DURATION } from './Toast.style';

export function useToast() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [messages, setMessages] = useState<ToastMessage[]>([]);

  function setMessageExpirationTimer(newToastMessage: ToastMessage) {
    setTimeout(function markNewMessageAsExpired() {
      setMessages((prevMessages) => {
        const goodMessages = prevMessages.map((msg) => {
          if (msg.id === newToastMessage.id) {
            return { ...msg, isExpired: true };
          }

          return msg;
        });
        return goodMessages;
      });
    }, newToastMessage.expiresIn);

    setTimeout(function closeTostIfHasNothingToShow() {
      setMessages((prevMessages) => {
        const goodMessages = prevMessages.filter((msg) => {
          return msg.id !== newToastMessage.id;
        });

        if (!goodMessages.length) {
          setTimeout(() => {
            setIsOpen(false);
          }, 100);
        }

        return goodMessages;
      });
    }, newToastMessage.expiresIn + TOAST_ANIM_DURATION);
  }

  function push(message: ReactNode) {
    const newToastMessage = new ToastMessage(message);

    setMessages((prevMessages) => {
      if (
        prevMessages.find((prevToast) => prevToast.id === newToastMessage.id)
      ) {
        return prevMessages;
      }
      return [...prevMessages, newToastMessage];
    });

    setMessageExpirationTimer(newToastMessage);
    setIsOpen(true);
  }

  return {
    isOpen,
    setIsOpen,
    messages,
    push,
  };
}
