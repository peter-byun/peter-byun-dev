import { RootLayout } from './RootLayout';
import { NavBarLayout } from './NavBarLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout>
      <NavBarLayout>{children}</NavBarLayout>
    </RootLayout>
  );
}
