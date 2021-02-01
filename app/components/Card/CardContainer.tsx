import Link from "next/link";
import React from "react";
import { Items } from "utils/api";
import EmptyState from "public/empty_state.svg";
import dynamic from "next/dynamic";

interface Props {
  data: Items | null | undefined;

  isLoading: boolean;
}
const Card = dynamic(
  () => import("components/Card/Card").then((mod) => mod.Card)!
);
const Cards: React.FC<Props> = ({ data, isLoading }) => {
  return (
    <>
      {data?.length ? (
        data.map((item, i) =>
          item.item ? (
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
          ) : (
            ""
          )
        )
      ) : isLoading ? (
        <div>Loading</div>
      ) : (
        <EmptyState className="mt-10 text-black transition duration-1000 fill-current dark:text-white" />
      )}
    </>
  );
};

export default Cards;
