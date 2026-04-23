import type { NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import AnimatedDiv from "src/components/AnimatedDiv";
import TechStackSection from "src/components/Technology/TechStackSection";
import { getPortfolioProfile } from "src/lib/portfolio";
import { getV1FeatureCards, getV1HomeIntro } from "src/lib/portfolioV1";

const profile = getPortfolioProfile();
const homeIntro = getV1HomeIntro();
const featureCards = getV1FeatureCards();

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Nasanjargal Binderiya | V1</title>
        <meta property="og:title" content="Nasanjargal Binderiya" key="title" />
      </Head>
      <AnimatedDiv>
        <motion.h1
          className="text-3xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.6, 0.01, -0.05, 0.95] }}
        >
          Hi, I&apos;m {homeIntro.name.split(" ")[0]} <WavingHand />
        </motion.h1>
        <motion.p
          className="opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: [0.6, 0.01, -0.05, 0.95] }}
        >
          {homeIntro.shortBio}
        </motion.p>
      </AnimatedDiv>
      <AnimatedDiv>
        <h1 className="text-3xl font-bold">
          What I <em>Actually</em> Do 💭
        </h1>
        <section>
          <div className="max-w-4xl mx-auto">
            <p className="text-left text-gray-700 dark:text-gray-300 mb-10 sm:mb-12 leading-relaxed">
              {homeIntro.focusIntro}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {featureCards.map((card) => (
                <div
                  key={card.id}
                  className={`bg-white dark:bg-gray-700/50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex items-start space-x-4 ${card.isWide ? "md:col-span-2" : ""}`}
                >
                  <div className="flex-shrink-0 text-3xl mt-1">{card.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">{card.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                      {card.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-lg text-left text-gray-700 dark:text-gray-300 mt-10 sm:mt-12 leading-relaxed">
              Currently {profile.currentRole}. Availability: {profile.status}. 🌍💻
            </p>
          </div>
        </section>
      </AnimatedDiv>

      <AnimatedDiv>
        <h1 className="text-3xl font-bold">Technologies 💻</h1>
        <TechStackSection />
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

export default HomePage;
