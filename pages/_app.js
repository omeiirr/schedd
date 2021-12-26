import { Store } from '../store';
import Head from 'next/head';
import '../styles/index.css';

function MyApp({ Component, pageProps }) {
  return (
    <Store>
      <Head>
        <title>Sched</title>
        <meta name='description' content='An app to keep your university schedule on track' />
        <link rel='icon' href='/favicon.ico' />
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
