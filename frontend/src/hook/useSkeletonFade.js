import { useEffect, useState } from "react";

export default function useSkeletonFade(loading, delay = 250) {
  const [showSkeleton, setShowSkeleton] = useState(loading);

  useEffect(() => {
    if (loading) {
      setShowSkeleton(true);
    } else {
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [loading, delay]);

  return showSkeleton;
}
