import { Store } from '../store';
import '../styles/index.css';
import { ChakraProvider } from '@chakra-ui/react';
function MyApp({ Component, pageProps }) {
  return (
    <Store>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Store>
  );
}

export default MyApp;
