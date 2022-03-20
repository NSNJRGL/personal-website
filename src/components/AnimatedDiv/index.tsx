import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  direction?: "top-to-bottom" | "bottom-to-top";
  className?: string;
};

const AnimatedDiv = ({
  children,
  direction = "bottom-to-top",
  className = "space-y-4",
}: Props) => {
  return (
    <motion.div
      className={`${className}`}
      initial={{ opacity: 0, y: direction === "bottom-to-top" ? 50 : -50 }}
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
      {children}
    </motion.div>
  );
};

export default AnimatedDiv;
