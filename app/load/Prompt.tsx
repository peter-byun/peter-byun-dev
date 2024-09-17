'use client';

import { useEffect, useRef } from 'react';

export function Prompt({
  validatePassword,
  fetchPosts,
}: {
  validatePassword(val: string): Promise<boolean>;
  fetchPosts(): Promise<void>;
}) {
  useEffect(() => {
    async function checkPassword() {
      const password = prompt('enter the password');

      const isPasswordValid = await validatePassword(password ?? '');

      if (isPasswordValid) {
        await fetchPosts();
        console.info('Fetched posts.');
      }
    }
    checkPassword();
  }, []);

  const cat = useRef<HTMLDivElement>(null);
  useEffect(() => {
    cat.current?.animate(
      [{ transform: 'rotateZ(0deg)' }, { transform: 'rotateZ(360deg)' }],
      {
        duration: 1000,
        iterations: Infinity,
      }
    );
  });

  return (
    <div
      ref={cat}
      style={{
        width: '1rem',
        margin: 'auto',
      }}
    >
      🐱
    </div>
  );
}
