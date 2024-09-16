'use client';

import { LoadingSpinner } from './LoadingSpinner';

export function LoadingScreen() {
  return (
    <div
      style={{
        width: '100%',
        height: 'calc(100vh - 10rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LoadingSpinner size="sm" />
    </div>
  );
}
