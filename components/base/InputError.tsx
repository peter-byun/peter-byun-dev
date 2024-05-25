import { ReactNode } from 'react';

export function InputError({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        color: 'orange',
      }}
    >
      {children}
    </div>
  );
}
