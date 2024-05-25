'use client';

import '../styles/variables.css';
import '../styles/mixins.css';
import '../styles/global.css';

import { RootHead } from '../components/layout/RootHead';
import { RootBody } from '../components/layout/RootBody';
import { ConfigProvider } from '../components/layout/ConfigProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <RootHead />
      <body>
        <ConfigProvider>
          <RootBody>{children}</RootBody>
        </ConfigProvider>
      </body>
    </html>
  );
}
