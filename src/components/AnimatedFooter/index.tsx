import { motion } from "framer-motion";
import { useCursorAnimation } from "src/hooks/useCursorAnimation";
import Image from "next/image";
import { useTheme } from "next-themes";

export function AnimatedFooter() {
  const { theme } = useTheme();
  const [ref, controls, square] = useCursorAnimation();

  return (
    <>
      <div className="absolute bottom-20">
        <div className="sticky">
          <motion.div
            ref={ref}
            variants={square}
            animate={controls}
            initial="hidden"
            className="h-[4rem] w-[8rem] sm:h-[6rem] sm:w-48 relative"
          >
            <Image
              src={
                theme === "dark" ? "/footer-1-white.svg" : "/footer-1-black.svg"
              }
              alt="footer-1"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-5 right-0">
        <div className="sticky">
          <motion.div
            ref={ref}
            variants={square}
            animate={controls}
            initial="hidden"
            className="h-[4rem] w-[8rem] sm:h-[6rem] sm:w-48 relative"
          >
            <Image
              src={
                theme === "dark" ? "/footer-2-white.svg" : "/footer-2-black.svg"
              }
              alt="footer-2"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </>
  );
}
