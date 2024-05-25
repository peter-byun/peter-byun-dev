'use client';
import '../styles/variables.css';
import '../styles/mixins.css';

import type { Metadata } from 'next';
import { RootHead } from './layout/RootHead';
import { RootBody } from './layout/RootBody';

// export const metadata: Metadata = {
//   title: 'Blog Home',
//   description: "Peter Byun's Software Engineering Blog",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <RootHead /> */}
      <body>
        {/* <RootBody>{children}</RootBody> */}
        {children}
      </body>
    </html>
  );
}
