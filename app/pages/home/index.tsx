import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import { MainContent } from "../../components/MainContent/MainContent";
import { apiHandler } from "../../utils/apiHandler";
import { getUserItems, Items } from "../../utils/api";
import { Card } from "../../components/Card/Card";
import { useQuery } from "react-query";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { error, data } = await apiHandler(
    getUserItems(context.req.headers.cookie)
  );
  let items: null | Items = null;
  if (error) {
    // Redirect if no user
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    items = data || null;
  }

  return {
    props: {
      items,
    },
  };
};
interface Props {
  items: Items | null;
}

const Home = ({ items }: Props) => {
  const { data } = useQuery("items", () => getUserItems(), {
    initialData: items,
  });

  return (
    <Layout showLogo={false} showLogin={false} title="Home">
      <MainContent>
        <div className="grid gap-10 justify-items-center card-container">
          {data?.map((item, i) => (
            <React.Fragment key={i}>
              <Card
                title={item.item.name}
                desc={item.item.description || "Help"}
                price={item.item.price}
                onSale={item.item.onSale}
                total_ratings={item.item.total_rating_count}
                avg_rating={item.item.avg_rating}
              />
            </React.Fragment>
          ))}
        </div>
      </MainContent>
    </Layout>
  );
};

export default Home;
