import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import { MainContent } from "../../components/MainContent/MainContent";
import { apiHandler } from "../../utils/apiHandler";
import { getUserItems, Items } from "../../utils/api";
import { Card } from "../../components/Card/Card";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { error, data } = await apiHandler(
    getUserItems(context.req.headers.cookie)
  );
  let items: null | Items = null;
  if (error) {
    console.log(error);
  } else {
    items = data || null;
  }
  if (!items) {
    // Redirect if no user
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      items,
    },
    redirect: "",
  };
};
interface Props {
  items: Items;
}

const Home = ({ items }: Props) => {
  return (
    <Layout showLogo={false} showLogin={false} title="Home">
      <MainContent>
        <div className="grid gap-10 justify-items-center card-container">
          {items.map((item, i) => (
            <React.Fragment key={i}>
              <Card
                title={item.item.name}
                desc={item.item.description || "Help"}
                price={"400"}
              />
            </React.Fragment>
          ))}
        </div>
      </MainContent>
    </Layout>
  );
};

export default Home;
