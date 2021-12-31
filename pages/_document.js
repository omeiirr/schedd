import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name='description' content='An app to keep your university schedule on track' />

          <link rel='icon' href='/Logo.svg' />

          {/* Link manifest.json */}
          <link rel='manifest' href='/manifest.json' />

          {/* Set color of URL bar */}
          <meta name='theme-color' content='#3490DE' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
