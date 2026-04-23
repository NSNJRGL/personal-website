import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { IoIosCloudDownload } from "react-icons/io";
import AnimatedDiv from "src/components/AnimatedDiv";
import { getV1AboutParagraphs, getV1ResumeLink } from "src/lib/portfolioV1";

const aboutParagraphs = getV1AboutParagraphs();
const resumeHref = getV1ResumeLink();

const AboutPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>About Nasanjargal Binderiya | V1</title>
        <meta property="og:title" content="About" key="title" />
      </Head>
      <AnimatedDiv>
        <h1 className="text-3xl font-bold">Little bit about me</h1>

        <div className="text-gray-900/30 hover:text-gray-900 dark:text-white/20 dark:hover:text-white/100 transition-all">
          <Image
            alt="Nasanjargal with Sys&CoTech colleagues"
            src="/image.png"
            height={400}
            width={1000}
            sizes="(min-width: 1024px) 1000px, 100vw"
            className="block h-auto w-full rounded-xl border-2 border-white object-cover"
          />
          <span className="text-sm not-sr-only">
            Me and{" "}
            <a href="https://www.syscotech.club/" rel="noopener noreferrer" target="_blank">
              Sys&CoTech folks
            </a>
          </span>
        </div>
      </AnimatedDiv>

      <AnimatedDiv>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6 text-lg leading-relaxed text-gray-700 dark:text-gray-400">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <a
            href={resumeHref}
            download="resume.pdf"
            className="inline-flex bg-gray-900 dark:bg-gray-800 items-center gap-x-2 px-6 py-3 border border-transparent text-base font-semibold rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            <IoIosCloudDownload className="h-5 w-5" aria-hidden="true" />
            Download Resume
          </a>
        </div>
      </AnimatedDiv>
    </>
  );
};

export default AboutPage;
