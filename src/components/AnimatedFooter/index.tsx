import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useLoaded } from "src/hooks/useLoaded";
import { useCursorAnimation } from "src/hooks/useCursorAnimation";

type FooterGraphicProps = {
  className: string;
  src: string;
};

function FooterGraphic({ className, src }: FooterGraphicProps) {
  const [ref, controls, variants] = useCursorAnimation();

  return (
    <div className={className}>
      <div className="sticky">
        <motion.div
          ref={ref}
          variants={variants}
          animate={controls}
          initial="hidden"
          className="relative h-[4rem] w-[8rem] sm:h-[6rem] sm:w-48"
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width: 640px) 12rem, 8rem"
            className="rounded-full object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
}

export function AnimatedFooter() {
  const loaded = useLoaded();
  const { resolvedTheme } = useTheme();

  if (!loaded) {
    return null;
  }

  const isDarkTheme = resolvedTheme === "dark";

  return (
    <>
      <FooterGraphic
        className="absolute bottom-20"
        src={isDarkTheme ? "/footer-1-white.svg" : "/footer-1-black.svg"}
      />
      <FooterGraphic
        className="absolute bottom-5 right-0"
        src={isDarkTheme ? "/footer-2-white.svg" : "/footer-2-black.svg"}
      />
    </>
  );
}
