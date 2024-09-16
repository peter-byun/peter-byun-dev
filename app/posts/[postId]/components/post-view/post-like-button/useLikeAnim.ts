import { useMemo, useState } from 'react';

export function useLikeAnim() {
  const [isLikeAnimationOn, setIsLikeAnimationOn] = useState<boolean>();

  function animate() {
    setIsLikeAnimationOn(true);
    setTimeout(() => {
      setIsLikeAnimationOn(false);
    }, 800);
  }

  const elementStyles = useMemo(() => {
    return {
      buttonStyle: {
        animation: isLikeAnimationOn ? 'like-anim 0.7s' : undefined,
      },
      heartStyle: {
        animation: isLikeAnimationOn ? 'gradient-anim 0.7s' : undefined,
      },
    };
  }, [isLikeAnimationOn]);

  return {
    animate,
    isLikeAnimationOn,
    elementStyles,
  };
}
