import { Html, Head, Main, NextScript } from 'next/document'

//At the moment this is managing the font and favicon 4/3/2023
export default function Document() {
  return (
    <Html>
        <Head>
          <link rel="icon" href="/faviconLarge.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Slab&family=Roboto:ital@0;1&display=swap"
            rel="stylesheet"
          />
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}