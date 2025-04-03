import type { NextPage } from "next";
import { motion } from "framer-motion";
import AnimatedDiv from "src/components/AnimatedDiv";
import Head from "next/head";
import TechStackSection from "src/components/Technology/TechStackSection";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Nasanjargal Binderiya</title>
        <meta property="og:title" content="Nasanjargal Binderiya" key="title" />
      </Head>
      <AnimatedDiv>
        <motion.h1
          className="text-3xl font-bold"
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
            Software Engineer with 6 years of experience designing scalable web applications and improving performance across both client-side and server-side systems. Proficient in modern frameworks and agile methodologies, with a track record of reducing load times, enhancing user engagement, and optimizing system reliability.
        </motion.p>
      </AnimatedDiv>
      <AnimatedDiv>
        <h1 className="text-3xl font-bold">What I <em>Actually</em> Do 💭</h1>
        <section>
          <div className="max-w-4xl mx-auto">

            <p className="text-left text-gray-700 dark:text-gray-300 mb-10 sm:mb-12 leading-relaxed">
              Think of me as a <strong>Digital Swiss Army Knife</strong> (or a{' '}
              <strong>Full-Stack Software Engineer</strong> when I'm feeling
              fancy! 😉). I dive into the code, tinker 'til it shines, and
              basically love making digital things awesome. Here's the fun
              stuff:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Card 1: Performance */}
              <div className="bg-white dark:bg-gray-700/50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex items-start space-x-4">
                <div className="flex-shrink-0 text-3xl mt-1">🚀</div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                    Performance Wizard
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    Turning sluggish sites into speed demons! Slashing load times
                    (like 5s down to 2s) and optimizing INP (500ms to 180ms) makes
                    users happy, and that makes me happy. 🎉
                  </p>
                </div>
              </div>

              {/* Card 2: Tech Juggler */}
              <div className="bg-white dark:bg-gray-700/50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex items-start space-x-4">
                <div className="flex-shrink-0 text-3xl mt-1"> 🤹</div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                    Tech Juggler 🎪
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    React, Angular, Ruby, Node, AWS, databases... I enjoy wrangling
                    a diverse tech stack! Choosing the right tools and making them
                    work together seamlessly is a fun challenge. 🛠️
                  </p>
                </div>
              </div>

              {/* Card 3: Builder */}
              <div className="bg-white dark:bg-gray-700/50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex items-start space-x-4">
                <div className="flex-shrink-0 text-3xl mt-1">🏗️</div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                    Builder of Cool Things
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    From slick user interfaces to robust backend systems, I love the
                    whole process. Being both the architect and the coder bringing
                    digital ideas to life is incredibly rewarding. ✨
                  </p>
                </div>
              </div>

              {/* Card 4: Bug Detective */}
              <div className="bg-white dark:bg-gray-700/50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex items-start space-x-4">
                <div className="flex-shrink-0 text-3xl mt-1">🐛</div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                    Bug Detective
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    Hunting down elusive bugs is like solving a puzzle. I enjoy the
                    chase, figuring out the 'why', and squashing them for
                    good, often with trusty tools like Cucumber. 🕵️‍♂️🔍
                  </p>
                </div>
              </div>

              {/* Card 5: Speed Demon */}
              <div className="bg-white dark:bg-gray-700/50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex items-start space-x-4 md:col-span-2">
                <div className="flex-shrink-0 text-3xl mt-1">⚡</div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                    Need for Speed!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                    Optimizing queries to take processing time from{' '}
                    <strong>1 minute down to 3 seconds</strong>? Absolutely! Seeing
                    those performance numbers skyrocket is seriously satisfying. 💨
                  </p>
                </div>
              </div>
            </div>

            <p className="text-lg text-left text-gray-700 dark:text-gray-300 mt-10 sm:mt-12 leading-relaxed">
              So yeah, that's me! A tech enthusiast{' '}
              <strong>passionately building, optimizing, and polishing the web</strong>,
              striving to make our digital world faster and more delightful, one
              project at a time! 🌍💻
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

export default Home;
