import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

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
        <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-B1LF5T79X0"
        />
        <Script id="google-analytics">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-B1LF5T79X0');
        `}
        </Script>
      </body>
    </Html>
  );
}
