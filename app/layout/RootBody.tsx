import { ConfigProvider } from './ConfigProvider';
import { NavBar } from './nav/NavBar';

export function RootBody({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar>{children}</NavBar>
      <ConfigProvider />
    </>
  );
}
