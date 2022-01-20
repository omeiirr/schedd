import { useState, useLayoutEffect } from 'react';

const useDetectPWA = () => {
  const [isPWA, setIsPWA] = useState(false);

  useLayoutEffect(() => {
    // For iOS
    if (window?.navigator?.standalone) {
      setIsPWA(true);
      return;
    }

    // For Android
    if (window?.matchMedia('(display-mode: standalone)').matches) {
      setIsPWA(true);
      return;
    }
  }, []);

  return [isPWA];
};

export default useDetectPWA;
