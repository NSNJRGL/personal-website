import "@styles/globals.css";
import type { AppProps } from "next/app";
import { Open_Sans } from "next/font/google";
import { Router } from "next/router";
import { useEffect } from "react";
import { ThemeProvider } from "next-themes";
import NavBar from "src/components/Navbar";
import NavBarMobile from "src/components/Navbar/NavbarMobile";
import { AnimatedFooter } from "src/components/AnimatedFooter";
import { Footer } from "src/components/Footer";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handleRouteChangeStart = () => NProgress.start();
    const handleRouteChangeComplete = () => NProgress.done();

    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeComplete", handleRouteChangeComplete);
    Router.events.on("routeChangeError", handleRouteChangeComplete);

    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteChangeComplete);
      Router.events.off("routeChangeError", handleRouteChangeComplete);
    };
  }, []);

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-JCV41WFHNL"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-JCV41WFHNL');
        `}
      </Script>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <div
          className={`${openSans.className} relative bg-white bg-gradient-to-tr dark:from-gray-900 dark:to-black dark:text-neutral-100`}
        >
          <NavBarMobile />
          <div className="max-w-4xl px-5 pt-0 md:container md:mx-auto">
            <NavBar />
            <main className="mx-auto max-w-3xl space-y-12 sm:pt-11">
              <Component {...pageProps} />
            </main>

            <div className="mx-auto max-w-3xl py-8">
              <hr className="border-t-2 border-gray-900/10 opacity-50 dark:border-white/10" />
              <Footer />
            </div>
          </div>
          <AnimatedFooter />
        </div>
      </ThemeProvider>
      <SpeedInsights />
    </>
  );
}

export default MyApp;
