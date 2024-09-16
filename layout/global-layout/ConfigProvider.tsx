'use client';

import { Analytics } from '@vercel/analytics/react';
import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Peter Byun',
};

export function ConfigProvider({ children }: { children?: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 60 * 3,
            cacheTime: 1000 * 60 * 60 * 6,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <Analytics />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}
