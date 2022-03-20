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
          Early on in my career I decided I wanted to be an expert in
          JavaScript. So I set my mind on mastering the world's most popular
          programming language. I spent countless hours writing JavaScript for
          the companies I worked for as well as in the evenings for open source
          and other side projects. Eventually I even represented PayPal on the
          TC-39 (the committee responsible for standardizing the JavaScript
          language). I feel like I achieved my goal of becoming an expert in
          JavaScript, but I do need to keep up just like everyone else, which is
          an enjoyable challenge.
        </motion.p>
      </AnimatedDiv>
      <AnimatedDiv>
        <h1 className="text-2xl font-bold sm:text-3xl">What do I do? 💭</h1>
        <p className="opacity-80">
          I've also always been excited about sharing what I know with others.
          When I was in school, I signed up to be a tutor for my classmates and
          once I even got Firebase to sponsor pizza for me to give an informal
          workshop about Angular.js to my fellow students. I was a speaker at
          the first meetup I ever attended, and I've now delivered over a
          hundred talks on topics including JavaScript, React, Testing, Careers,
          and more. One of my talks got noticed by egghead and I was invited to
          turn that talk into an egghead course. The rest is history!
        </p>
      </AnimatedDiv>

      <AnimatedDiv>
        <h1 className="text-2xl font-bold sm:text-3xl">Technologies 💻</h1>
        <p className="opacity-80">
          One of the biggest things that has helped me learn is by committing
          myself to sharing what I know with others. Between podcasts, blog
          posts, talks, and workshops, I force myself into situations where I
          have to be accountable to those I'm teaching to really know my stuff.
          And as a result, a lot of people have learned from me as well.
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
