'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  selector: string;
}

export default function Portal({ children, selector }: PortalProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  // @ts-expect-error-react-19-type-error
  return mounted && ref.current ? createPortal(children, ref.current) : null;
}
