import type { GetServerSideProps, NextPage } from "next";

const AboutRedirect: NextPage = () => null;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/v1/about",
      permanent: true,
    },
  };
};

export default AboutRedirect;
