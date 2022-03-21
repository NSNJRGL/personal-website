import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import AnimatedDiv from "src/components/AnimatedDiv";
import Card from "src/components/Card";
import { TrackProps } from "src/components/Card";
import { motion } from "framer-motion";
import { useCursorAnimation } from "src/hooks/useCursorAnimation";

interface Props {
  tracks: {
    tracks: TrackProps[];
  };
}

const About: NextPage<Props> = (props) => {
  const { tracks } = props;
  const [ref, controls, square] = useCursorAnimation();

  return (
    <>
      <Head>
        <title>About Nasanjargal Binderiya</title>
        <meta property="og:title" content="About" key="title" />
      </Head>
      <AnimatedDiv>
        <h1 className="text-3xl font-bold sm:text-2xl md:text-3xl">About</h1>

        <div className="text-gray-900/30 hover:text-gray-900 dark:text-white/20 dark:hover:text-white/100 transition-all">
          <Image
            alt="me"
            src="/image.png"
            height={400}
            width={1000}
            layout="responsive"
            className="block object-cover rounded-xl border-2 border-white"
          />
          <span className="text-sm not-sr-only">
            Me and{" "}
            <a
              href="https://www.syscotech.club/"
              rel="noreferrer"
              target="_blank"
            >
              Sys&CoTech folks
            </a>
          </span>
        </div>
      </AnimatedDiv>

      <AnimatedDiv>
        <p>
          Strong knowledge and Hands-on experience in Modern Web Development and
          Mobile practices. Passionate about learning new technologies and
          skills. ​​Talented Front-End Developer with 3 years of professional
          experience maximizing application performance and resolving technical
          errors. Skilled at building products and solving problems with
          semantically and syntactically clean and readable code using the
          latest frameworks, web services, and design patterns.
        </p>
      </AnimatedDiv>

      <AnimatedDiv>
        <h2 className="text-3xl font-bold">Music</h2>
        <p>
          I listen to a lot of Spotify and have always had a passion for music
          ever since. Over the last 12 months, I've played the song hundred
          times! Below you can find an up-to-date collection of my favourite
          songs from the past ~4 weeks.
        </p>
      </AnimatedDiv>

      <motion.div
        ref={ref}
        variants={square}
        animate={controls}
        initial="hidden"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6"
      >
        {tracks.tracks.map((track: TrackProps, index: number) => (
          <Card key={index} track={track} />
        ))}
      </motion.div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${process.env.WEB_URL}/api/top-tracks`);
  const tracks = await res.json();

  return {
    props: {
      tracks,
    },
  };
};

export default About;
