import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import AnimatedDiv from "src/components/AnimatedDiv";
import Card from "src/components/Card";
import { TrackProps } from "src/components/Card";
import { motion } from "framer-motion";
import { useCursorAnimation } from "src/hooks/useCursorAnimation";
import { getTopTracks } from "src/lib/spotify";

interface Props {
  tracks: TrackProps[];
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
            Proficient in modern web development and mobile practices, with a strong dedication to learning new technologies and enhancing skills. A talented front-end developer with three years of professional experience, adapt at optimizing application performance and troubleshooting technical issues. Skilled in crafting products and addressing challenges through clean, readable code employing contemporary frameworks, web services, and design patterns
        </p>
      </AnimatedDiv>

      <AnimatedDiv>
        <h2 className="text-3xl font-bold">Music</h2>
        <p>
            As an avid Spotify listener, my love for music has been ingrained since early on. In the past year alone, I've played my favorite song hundreds of times! Below, you'll discover a current compilation of my top picks from the last month or so.
        </p>
      </AnimatedDiv>

      <motion.div
        ref={ref}
        variants={square}
        animate={controls}
        initial="hidden"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6"
      >
        {tracks.map((track: TrackProps, index: number) => (
          <Card key={index} track={track} />
        ))}
      </motion.div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const response = await getTopTracks();
  const { items } = await response.json();

  const tracks = items.slice(0, 12).map((track: any) => ({
    artist: track.artists.map((_artist: any) => _artist.name).join(", "),
    songUrl: track.external_urls.spotify,
    title: track.name,
    image: track.album.images[1],
  }));

  return {
    props: {
      tracks,
    },
  };
};

export default About;
