import { ReactElement, ReactNode, HTMLAttributes } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

export type BaseComponentProps<A extends HTMLAttributes<HTMLElement>> = {
  children?: React.ReactNode;
} & A;

// Next.js page types
export type NextPageWithLayout<P = Record<string, unknown>> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout<P = Record<string, unknown>> = AppProps & {
  Component: NextPageWithLayout<P>;
};
