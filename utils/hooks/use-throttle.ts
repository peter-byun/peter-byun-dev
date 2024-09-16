import { useCallback, useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useThrottle = <P extends any[] = any[]>(
  callback: (...args: P) => void | undefined,
  interval = 2000
) => {
  const isCallbackLocked = useRef<boolean>(false);
  const callbackLockTimeout = useRef<ReturnType<
    typeof window.setTimeout
  > | null>(null);

  const throttledCallback = useCallback(
    (...args: P) => {
      if (isCallbackLocked.current) return;

      callback(...args);

      isCallbackLocked.current = true;

      callbackLockTimeout.current = setTimeout(() => {
        isCallbackLocked.current = false;
      }, interval);
    },
    [callback, isCallbackLocked, callbackLockTimeout, interval]
  );

  useEffect(() => {
    return () => {
      callbackLockTimeout.current && clearTimeout(callbackLockTimeout.current);
    };
  }, []);

  return [throttledCallback];
};
