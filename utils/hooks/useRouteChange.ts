import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export const useRouteChange = ({
  onRouteChange,
}: {
  onRouteChange: () => void;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(
    function handleRouteChange() {
      return () => {
        onRouteChange();
      };
    },
    [pathname, searchParams]
  );
};
