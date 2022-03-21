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
          First of all, let me share my story of how I fell in love with the
          computer the very first time. When I was in ninth grade, my parents
          bought me a computer and internet. At the time, It feels like magic
          when I first entered to google.com website. After that, I have been
          trying to find how things are working, like this way. Like a child, I
          became curious about everything. This characteristic is not changed at
          all. Even though I got into a job, I have been trying to find another
          solution to implement any problem. My coworkers used to say to me, how
          did you find out these kinds of interesting things. I think one of the
          valuable things that I give to my team or organization is curiosity. I
          think this attitude has been relevant to me since I was a child.
        </motion.p>
      </AnimatedDiv>
      <AnimatedDiv>
        <h1 className="text-2xl font-bold sm:text-3xl">What do I do? 💭</h1>
        <p className="opacity-80">
          Early on in my career I decided I wanted to be an expert in
          JavaScript. So I set my mind on mastering the world's most popular
          programming language. I spent countless hours writing JavaScript for
          the companies I worked for as well as in the evenings for other side
          projects. I feel like I achieved my goal of becoming an expert in
          JavaScript, but I do need to keep up just like everyone else, which is
          an enjoyable challenge.
        </p>
      </AnimatedDiv>

      <AnimatedDiv>
        <h1 className="text-2xl font-bold sm:text-3xl">Technologies 💻</h1>
        <p className="opacity-80">
          I use a wide range of tools to tackle each hurdle in the most
          efficient manner possible. Try asking yourself with this question.
          Without tools, would humankind be as prosperous as it is today?
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
