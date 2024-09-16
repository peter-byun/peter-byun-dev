'use client';

import '../styles/variables.css';
import '../styles/mixins.css';
import '../styles/global.css';

import { RootHead } from '../layout/global-layout/RootHead';
import { ConfigProvider } from '../layout/global-layout/ConfigProvider';
import { HeaderContextProvider } from '../states/global/header-state';
import { NavBar } from '../layout/global-layout/nav/NavBar';

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
            <NavBar>{children}</NavBar>
          </ConfigProvider>
        </body>
      </HeaderContextProvider>
    </html>
  );
}
