'use client';

import { LoadingSpinner } from './LoadingSpinner';

export function LoadingScreen() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LoadingSpinner size="sm" />
    </div>
  );
}
