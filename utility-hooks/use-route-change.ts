import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const useRouteChange = ({
  onRouteChange,
}: {
  onRouteChange: () => void;
}) => {
  const router = useRouter();

  useEffect(
    function handleRouteChange() {
      return () => {
        onRouteChange();
      };
    },
    [router.pathname, router.query]
  );
};
