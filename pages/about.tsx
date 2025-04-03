import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import AnimatedDiv from "src/components/AnimatedDiv";
import Card from "src/components/Card";
import { TrackProps } from "src/components/Card";
import { motion } from "framer-motion";
import { useCursorAnimation } from "src/hooks/useCursorAnimation";
import { IoIosCloudDownload } from "react-icons/io";

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
        <h1 className="text-3xl font-bold">Little bit about me</h1>

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
        <div className="max-w-3xl mx-auto">

          <div className="text-lg text-gray-700 dark:text-gray-400 space-y-6 leading-relaxed"> {/* Added space-y for paragraph spacing */}
            <p>
              Hello! I'm a passionate Full-Stack Software Engineer driven by the challenge of building efficient, scalable, and user-friendly digital experiences. What truly excites me about this field is that **I always love to learn**. Technology is constantly evolving, and I thrive on diving into new frameworks, exploring different architectural patterns, and continuously honing my craft to stay ahead of the curve.
            </p>
            <p>
              Professionally, I enjoy tackling the entire development lifecycle. I'm comfortable taking ownership and seeing projects through **from analyzing the initial system requirements all the way to meeting the final project deadline**. There's a deep satisfaction in transforming an idea into a tangible, high-quality product that solves real problems.
            </p>
            <p>
              When I step away from the keyboard, you'll often find me with a guitar in hand. **I love playing both acoustic and electric guitar** – it's my go-to creative outlet for unwinding and exploring a different kind of expression. 🎸 It's a great balance to the analytical nature of coding!
            </p>
            <p>
              I believe this blend of technical curiosity, project dedication, and creative thinking allows me to bring a unique and valuable perspective to the teams and projects I work on.
            </p>
          </div>
        </div>

        <div className="mt-15 text-center"> {/* Added margin-top and centered the content */}
          <a
            href={`/${"resume.pdf"}`} // Path relative to the public folder
            download={"resume.pdf"} // Suggests filename to the browser
            target="_blank" // Opens in new tab (or triggers download directly)
            rel="noopener noreferrer" // Security for target="_blank"
            className="inline-flex bg-gray-900 dark:bg-gray-800 items-center gap-x-2 px-6 py-3 border border-transparent text-base font-semibold rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out"
            // ^^^ Styling classes for the button appearance
          >
            <IoIosCloudDownload className="h-5 w-5" aria-hidden="true" />
            Download Resume
          </a>
        </div>
      </AnimatedDiv>
    </>
  );
};

export default About;
