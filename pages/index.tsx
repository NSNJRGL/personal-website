import type { NextPage } from "next";
import Head from "next/head";
import ChatShell from "src/components/chat/ChatShell";
import { getPortfolioLinks, getPortfolioProfile } from "src/lib/portfolio";

const profile = getPortfolioProfile();
const links = getPortfolioLinks();

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Nasanjargal Binderiya | Portfolio V2</title>
        <meta property="og:title" content="Nasanjargal Binderiya | Portfolio V2" key="title" />
        <meta
          name="description"
          content="Chat with Nasanjargal Binderiya's portfolio assistant about his experience, projects, skills, and contact details."
        />
      </Head>
      <ChatShell
        name={profile.name}
        headline={profile.headline}
        shortBio={profile.shortBio}
        focus={profile.currentFocus}
        links={links}
      />
    </>
  );
};

export default Home;
