import { type AnimationControls, type Variants, useAnimation } from "framer-motion";
import type { RefCallback } from "react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

type CursorAnimationTuple = [RefCallback<Element>, AnimationControls, Variants];

const variants: Variants = {
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
      ease: "easeInOut",
      duration: 1.6,
    },
  },
};

export const useCursorAnimation = (): CursorAnimationTuple => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      void controls.start("visible");
    }
  }, [controls, inView]);

  return [ref, controls, variants];
};
