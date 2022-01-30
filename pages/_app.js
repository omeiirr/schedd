import { Store } from '../store';
import Head from 'next/head';
import '../styles/index.css';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import useDetectPWA from 'hooks/useDetectPWA';

function MyApp({ Component, pageProps }) {
  const [isPwaInstalled] = useDetectPWA();
  useEffect(() => {
    // Add Google Analytics
    ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID);

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')

        .then((resgistration) => {
          console.log('SW registered succesfully', resgistration);
        })

        .catch((err) => {
          console.log('SW registration failed', err);
        });
    }
  }, []);

  useEffect(() => {
    if (isPwaInstalled) {
      ReactGA.event('pwaOpened', {
        event_category: 'APP'
      });
    } else {
      ReactGA.event('nonPwaOpened', {
        event_category: 'APP'
      });
    }
  }, [isPwaInstalled]);

  return (
    <Store>
      <div className=' sm:bg-primary-700'>
        <div className='max-w-screen-sm sm:mx-auto sm:my-auto sm:bg-white sm:min-h-screen sm:shadow-md sm:shadow-white'>
          <Component {...pageProps} />
        </div>
      </div>
    </Store>
  );
}

export default MyApp;
