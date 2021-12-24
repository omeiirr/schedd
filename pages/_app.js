import { ChakraProvider } from '@chakra-ui/react';
function MyApp({ Component, pageProps }) {
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
}

export default MyApp
