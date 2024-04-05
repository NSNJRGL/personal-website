import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="og:title" content="Nasanjargal Binderiya" />
        <meta name="og:description" content="Nasaa's personal website" />
        <meta
          name="og:keywords"
          content="Nasanjargal.com, Nasanjargal Binderiya, Nasanjargal, Nasaa.com, Nasaa"
        />
        <meta
          property="og:image"
          content="https://www.nasanjargal.com/image.png"
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
