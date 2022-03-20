import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export function AnimatedFooter() {
  const { theme } = useTheme();
  const squareVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.6, 0.01, -0.05, 0.95] },
    },
    exit: {
      opacity: 0,
      y: 0,
      transition: {
        ease: "fadeInOpacity",
        duration: 1.6,
      },
    },
  };
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <>
      <div className="absolute bottom-20">
        <div className="sticky">
          <motion.div
            ref={ref}
            variants={squareVariants}
            animate={controls}
            initial="hidden"
            className="h-[4rem] w-[8rem] sm:h-[6rem] sm:w-48 square relative"
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
            variants={squareVariants}
            animate={controls}
            initial="hidden"
            className="h-[4rem] w-[8rem] sm:h-[6rem] sm:w-48 square relative"
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
