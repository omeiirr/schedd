import { useState, useEffect } from 'react';

const useDetectPWA = () => {
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
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
