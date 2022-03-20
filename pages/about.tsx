import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import AnimatedDiv from "src/components/AnimatedDiv";

const About: NextPage = () => {
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
          I listen to a lot of Youtube and have always had a passion for music
          ever since. Over the last 12 months, I've played the song hundred
          times! Below you can find an up-to-date collection of my favourite
          songs from the past ~4 weeks.
        </p>
      </AnimatedDiv>
    </>
  );
};

export default About;
