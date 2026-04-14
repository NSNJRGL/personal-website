import { useEffect, useState } from "react";
import { NavLink } from "./";
import { motion } from "framer-motion";
import ToggleButton from "../ToggleButton";

const NavBarMobile = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const listener = () => {
      setHasScrolled(window.scrollY > 20);
    };

    listener();
    window.addEventListener("scroll", listener, { passive: true });

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  return (
    <>
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
            ease: "easeInOut",
            duration: 1.6,
          },
        }}
      >
        <div
          className={`${hasScrolled ? "mt-0" : "mt-10 mx-5"} relative bg-gray-100 transition-all dark:bg-gray-900 ${
            hasScrolled ? "rounded-none" : "rounded-lg"
          }`}
        >
          <div className="flex items-center justify-between space-x-2 bg-transparent transition-colors">
            <nav className="flex-1" aria-label="Mobile">
              <ul className="flex space-x-4">
                <NavLink href="/" title="/home" />
                <NavLink href="/about" title="/about" />
              </ul>
            </nav>

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
