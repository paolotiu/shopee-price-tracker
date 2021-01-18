import React from "react";
import { Background } from "../../components/Background/Background";
import Layout from "../../components/Layout";

const Home = () => {
  return (
    <Layout showLogo={false} showLogin={false} title="Home">
      <div>
        <Background />
      </div>
    </Layout>
  );
};

export default Home;
