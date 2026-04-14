import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Nasaa's personal website" />
        <meta
          name="keywords"
          content="Nasanjargal.com, Nasanjargal Binderiya, Nasanjargal, Nasaa.com, Nasaa"
        />
        <meta property="og:title" content="Nasanjargal Binderiya" />
        <meta property="og:description" content="Nasaa's personal website" />
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
