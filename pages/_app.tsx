import "@styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import NavBar from "src/components/Navbar";
import NavBarMobile from "src/components/Navbar/NavbarMobile";
import { AnimatedFooter } from "src/components/AnimatedFooter";
import { Footer } from "src/components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="relative bg-gradient-to-tr dark:from-gray-900 dark:to-black dark:text-neutral-100 bg-white">
        <NavBarMobile />
        <div className="md:container md:mx-auto pt-10 px-5 max-w-4xl">
          <NavBar />
          <main className="mx-auto space-y-12 max-w-3xl sm:pt-12">
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
  );
}

export default MyApp;
