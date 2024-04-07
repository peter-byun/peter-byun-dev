import { ReactNode, useState } from 'react';
import { ToastMessage } from './ToastMessage';
import { TOAST_ANIM_DURATION } from './Toast.style';

export function useToast() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [messages, setMessages] = useState<ToastMessage[]>([]);

  function setMessageExpirationTimer(toastMessage: ToastMessage) {
    setTimeout(() => {
      setMessages((prevMessages) => {
        const goodMessages = prevMessages.map((msg) => {
          if (msg.id !== toastMessage.id) {
            return msg;
          }

          return { ...msg, isExpired: true };
        });
        return goodMessages;
      });
    }, toastMessage.expiresIn);
    setTimeout(() => {
      setMessages((prevMessages) => {
        const goodMessages = prevMessages.filter((msg) => {
          return msg.id !== toastMessage.id;
        });

        if (!goodMessages.length) {
          setTimeout(() => {
            setIsOpen(false);
          }, 100);
        }

        return goodMessages;
      });
    }, toastMessage.expiresIn + TOAST_ANIM_DURATION);
  }

  function push(message: ReactNode) {
    const toastMessage = new ToastMessage(message);

    setMessages((prevMessages) => {
      if (prevMessages.find((prevToast) => prevToast.id === toastMessage.id)) {
        return prevMessages;
      }
      return [...prevMessages, toastMessage];
    });

    setMessageExpirationTimer(toastMessage);
    setIsOpen(true);
  }

  return {
    isOpen,
    setIsOpen,
    messages,
    push,
  };
}
