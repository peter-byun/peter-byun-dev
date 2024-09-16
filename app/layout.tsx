'use client';

import '../styles/variables.css';
import '../styles/mixins.css';
import './layout.css';

import { RootHead } from '../layout/root-layout/RootHead';
import { ConfigProvider } from '../layout/root-layout/ConfigProvider';
import { HeaderContextProvider } from './states/global/header-state';
import { NavBar } from '../layout/root-layout/nav/NavBar';
import { Suspense } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <HeaderContextProvider>
        <RootHead />
        <body>
          <ConfigProvider>
            <Suspense fallback={'loading'}>
              <NavBar>{children}</NavBar>
            </Suspense>
          </ConfigProvider>
        </body>
      </HeaderContextProvider>
    </html>
  );
}
