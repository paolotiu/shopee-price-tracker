import React, { useEffect, useState } from "react";

import Layout from "components/Layout";
import { MainContent } from "components/MainContent/MainContent";
import { apiHandler } from "utils/apiHandler";
import { getUserItems, Items, postItem } from "utils/api";
import { useQuery } from "react-query";

import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";

const Cards = dynamic(() => import("components/Card/CardContainer"), {
  loading: () => <p>Loading...</p>,
});
const Searchbar = dynamic(() => import("components/Searchbar/Searchbar"), {
  ssr: false,
});

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
  const { data, refetch, isLoading } = useQuery("items", () => getUserItems(), {
    initialData: items,
    enabled: false,
  });
  // Refetch on mount
  useEffect(() => {
    refetch();
  }, []);
  const [url, setUrl] = useState("");
  const changeUrl = (url: string) => {
    setUrl(url);
  };
  const searchItem = async () => {
    toast.loading("Searching");
    const res = await apiHandler(postItem(url));
    if (res.data) {
      toast.dismiss();
      toast.success(res.data.message);

      refetch();
    } else {
      toast.dismiss();
      toast.error(res.error.message);
    }

    setUrl("");
  };
  return (
    <Layout showLogo={false} showLogin={false} title="Home">
      <MainContent>
        <div className="grid gap-10 p-8 pt-0 md:p-20 md:pt-0">
          <Searchbar url={url} setUrl={changeUrl} searchItem={searchItem} />
          <div className="grid gap-10 justify-items-center card-container">
            <Cards data={data} isLoading={isLoading} />
          </div>
        </div>
      </MainContent>
    </Layout>
  );
};

export default Home;
