import { useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const useCursorAnimation = () => {
  const variants = {
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
  const controls: any = useAnimation();
  const [ref, inView]: any = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return [ref, controls, variants];
};
