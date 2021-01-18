import { GetServerSideProps } from "next";
import React from "react";
import Layout from "../../components/Layout";
import { MainContent } from "../../components/MainContent/MainContent";

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};

const Home = () => {
  return (
    <Layout showLogo={false} showLogin={false} title="Home">
      <MainContent>
        <div>Hello</div>
      </MainContent>
    </Layout>
  );
};

export default Home;
