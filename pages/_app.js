import { Store } from '../store';
import Head from 'next/head';
import '../styles/index.css';
import { ChakraProvider } from '@chakra-ui/react';
function MyApp({ Component, pageProps }) {
  return (
    <Store>
      <Head>
        <title>Sched</title>
        <meta name="description" content="An app to keep your university schedule on track" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Store>
  );
}

export default MyApp;
