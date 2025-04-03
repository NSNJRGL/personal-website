import "@styles/globals.css";
import type { AppProps } from "next/app";
import { Router } from "next/router";
import { ThemeProvider } from "next-themes";
import NavBar from "src/components/Navbar";
import NavBarMobile from "src/components/Navbar/NavbarMobile";
import { AnimatedFooter } from "src/components/AnimatedFooter";
import { Footer } from "src/components/Footer";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Script from "next/script";
import { SpeedInsights } from '@vercel/speed-insights/next';

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
          <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-JCV41WFHNL"
          />
          <Script id="google-analytics">
              {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-JCV41WFHNL');
        `}
          </Script>
          <ThemeProvider attribute="class" defaultTheme="dark">
              <div className="relative bg-gradient-to-tr dark:from-gray-900 dark:to-black dark:text-neutral-100 bg-white">
                  <NavBarMobile />
                  <div className="md:container md:mx-auto pt-0 px-5 max-w-4xl">
                      <NavBar />
                      <main className="mx-auto space-y-12 max-w-3xl sm:pt-11">
                          <Component {...pageProps} />
                      </main>

                      <div className="py-8 max-w-3xl mx-auto">
                          <hr className="border-t-2 border-gray-900/10 dark:border-white/10 opacity-50" />
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
