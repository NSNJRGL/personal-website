import { useEffect, useState } from "react";
import { Pivot as Hamburger } from "hamburger-react";
import { NavLink } from "./";
import { AnimatePresence, motion } from "framer-motion";
import ToggleButton from "../ToggleButton";

const NavBarMobile = () => {
  const [mobileMenuOpen, setMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((old) => !old);
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const listener = () => {
      setHasScrolled(window.scrollY > 20);
    };

    document.addEventListener("scroll", listener);

    return () => {
      document.removeEventListener("scroll", listener);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navLinks = (
    <>
      <NavLink href="/" title="/home" closeMenu={closeMenu} />
      <NavLink href="/about" title="/about" closeMenu={closeMenu} />
    </>
  );

  return (
    <>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 py-24 px-8 space-y-2 bg-white dark:bg-gray-900 sm:hidden"
          >
            <h1 className="text-4xl font-bold">Menu.</h1>

            <ul className="grid grid-cols-1 gap-2">{navLinks}</ul>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="overflow-hidden sticky top-0 z-20 h-32 transition-all sm:hidden"
        initial={{ opacity: 0, y: -50 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 1, ease: [0.6, 0.01, -0.05, 0.95] },
        }}
        exit={{
          opacity: 0,
          y: 0,
          transition: {
            ease: "fadeInOpacity",
            duration: 1.6,
          },
        }}
      >
        <div
          className={`${
            hasScrolled || mobileMenuOpen ? "mt-0" : "mt-10 mx-5"
          } bg-gray-100 dark:bg-gray-900 relative transition-all ${
            hasScrolled || mobileMenuOpen ? "rounded-none" : "rounded-lg"
          }`}
        >
          <div
            className={`flex justify-between items-center transition-colors space-x-2 ${
              mobileMenuOpen ? "bg-gray-100 dark:bg-gray-800" : "bg-transparent"
            }`}
          >
            <button
              type="button"
              className="block relative z-50 px-2 text-gray-500 focus:ring transition-all"
              onClick={toggleMenu}
            >
              <Hamburger
                toggled={mobileMenuOpen}
                size={20}
                color="currentColor"
              />
            </button>

            <div className="overflow-hidden py-2 px-4 flex items-center">
              <ToggleButton />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default NavBarMobile;
