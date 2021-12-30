import { Store } from '../store';
import Head from 'next/head';
import '../styles/index.css';
import { useEffect } from 'react';
import ReactGA from 'react-ga'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Add Google Analytics
    ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID);
    ReactGA.pageview(window.location.pathname + window.location.search); // report page view

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

  return (
    <Store>
      <Head>
        <title>Sched</title>
        <meta name='description' content='An app to keep your university schedule on track' />

        <link rel='icon' href='/Logo.svg' />

        {/* Link manifest.json */}
        <link rel='manifest' href='/manifest.json' />

        {/* Set color of URL bar */}
        <meta name='theme-color' content='#3490DE' />
      </Head>
      <div className=' sm:bg-cyan-900'>
        <div className='max-w-screen-sm sm:mx-auto sm:my-auto sm:bg-white sm:min-h-screen sm:shadow-md sm:shadow-white'>
          <Component {...pageProps} />
        </div>
      </div>
    </Store>
  );
}

export default MyApp;
