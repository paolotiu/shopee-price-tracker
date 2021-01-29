import React, { useEffect, useState } from "react";

import Layout from "components/Layout";
import { MainContent } from "components/MainContent/MainContent";
import { apiHandler } from "utils/apiHandler";
import { getUserItems, Items, postItem } from "utils/api";
import { useQuery } from "react-query";
import MagGlass from "public/magnifying_glass.svg";
import EmptyState from "public/empty_state.svg";

import { toast } from "react-hot-toast";
import { GetServerSideProps } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";

const Card = dynamic(import("components/Card/Card").then((mod) => mod.Card)!);
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
  const [url, setUrl] = useState("");

  const pasteToInput = () => {
    navigator.clipboard.readText().then((text) => {
      setUrl(text);
    });
  };

  // Refetch on mount
  useEffect(() => {
    refetch();
  }, []);

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
          <div className="relative flex justify-center w-full h-full rounded md:w-5/6 place-self-center">
            <div className="relative flex items-center h-full input-wrapper">
              <input
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
                className="w-full max-w-xl p-2 pl-10 overflow-hidden text-black outline-none overflow-ellipsis focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://shopee.ph/example-product"
              />
              <img
                src="https://img.icons8.com/ios/50/000000/paste.png"
                onClick={pasteToInput}
                className="absolute text-gray-400 transition duration-500 ease-in transform -translate-y-1/2 fill-current max-w-min h-1/2 top-1/2 left-2"
              />
              <button
                className={
                  "h-full px-2 rounded-r-lg bg-accent disabled:bg-gray-300 transition duration-500 "
                }
                disabled={!url}
                onClick={searchItem}
              >
                <MagGlass
                  id="mag-glass"
                  className={
                    url
                      ? "text-black transition duration-500 ease-in fill-current max-w-min h-1/2"
                      : "text-gray-500 transition duration-500 ease-in fill-current max-w-min h-1/2"
                  }
                />
              </button>
            </div>
          </div>

          <div className="grid gap-10 justify-items-center card-container">
            {data?.length ? (
              data.map((item, i) => (
                <React.Fragment key={i}>
                  <Link href={`/home/item/${item.item.itemID}`}>
                    <div className="transition duration-200 transform cursor-pointer hover:scale-105">
                      <a className="w-full h-full ">
                        <Card
                          title={item.item.name}
                          desc={item.item.description || "Help"}
                          price={item.item.price}
                          onSale={item.item.onSale}
                          sold={item.item.historical_sold}
                          avg_rating={item.item.avg_rating}
                        />
                      </a>
                    </div>
                  </Link>
                </React.Fragment>
              ))
            ) : isLoading ? (
              <div>Loading</div>
            ) : (
              <EmptyState className="mt-10 text-black transition duration-1000 fill-current dark:text-white" />
            )}
          </div>
        </div>
      </MainContent>
    </Layout>
  );
};

export default Home;
