import type { NextPage } from "next";
import { Technology } from "src/components/Technology";
import { motion } from "framer-motion";
import AnimatedDiv from "src/components/AnimatedDiv";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Nasanjargal Binderiya</title>
        <meta property="og:title" content="Nasanjargal Binderiya" key="title" />
      </Head>
      <AnimatedDiv>
        <motion.h1
          className="text-3xl font-bold sm:text-2xl md:text-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.6, 0.01, -0.05, 0.95] }}
        >
          Hi, I'm Nasanjargal <WavingHand />
        </motion.h1>
        <motion.p
          className="opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.6, 0.01, -0.05, 0.95] }}
        >
            Let me begin by sharing the story of how my fascination with computers ignited. Back in ninth grade, my parents gifted me a computer and internet access. The moment I navigated to google.com, it felt like stepping into a realm of magic. From that point on, I delved into understanding how things worked, much like a curious child exploring the world. This innate curiosity remains unchanged.
        </motion.p>
      </AnimatedDiv>
      <AnimatedDiv>
        <h1 className="text-2xl font-bold sm:text-3xl">What do I do? 💭</h1>
        <p className="opacity-80">
            At the outset of my career, I made a deliberate choice to specialize in JavaScript, aiming to master the world's most widely used programming language. I dedicated numerous hours to crafting JavaScript code, both during my professional engagements and in my personal projects after hours. While I believe I have attained expertise in JavaScript, I recognize the importance of staying current—a task that presents an enjoyable challenge, just like it does for every other developer.
        </p>
      </AnimatedDiv>

      <AnimatedDiv>
        <h1 className="text-2xl font-bold sm:text-3xl">Technologies 💻</h1>
        <p className="opacity-80">
            In navigating challenges, I leverage an array of tools to ensure optimal efficiency. Consider this: without the aid of tools, would humanity have achieved the level of prosperity we enjoy today?
        </p>

        <Technology />
      </AnimatedDiv>
    </>
  );
};

const WavingHand = () => (
  <motion.div
    style={{
      display: "inline-block",
    }}
    animate={{ rotate: 20 }}
    transition={{
      repeat: 7,
      repeatType: "mirror",
      duration: 0.2,
      delay: 0.5,
      ease: "easeInOut",
      type: "tween",
    }}
  >
    👋🏻
  </motion.div>
);

export default Home;
