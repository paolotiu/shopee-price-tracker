import React from "react";
import Clamp from "react-multiline-clamp";
import { Detail } from "./Detail";

interface Props {
  title: string;
  desc: string;
  price: string | number;
  onSale: boolean;
  total_ratings: number;
  avg_rating: number;
}

export const Card = ({
  title,
  desc,
  price,
  onSale,
  total_ratings,
  avg_rating,
}: Props) => {
  avg_rating = Math.round((avg_rating + Number.EPSILON) * 100) / 100;
  return (
    <div className="flex flex-col justify-between w-full h-full max-w-lg transition duration-1000 p-7 dark:bg-white bg-white-pure ">
      <div>
        <Clamp lines={2}>
          <h1 className="pb-1 font-bold text-black-lighter ">{title}</h1>
        </Clamp>
        <hr />
        <p className="pt-2 overflow-hidden text-sm text-gray-400 pb-7">
          <Clamp lines={3} maxLines={3}>
            {desc}
          </Clamp>
        </p>
      </div>
      <div className="grid grid-flow-col auto-cols-fr -mb-7 -mx-7 bg-primary top-full">
        <Detail title="Price" content={"P" + price} />
        <Detail
          title="Rating"
          content={avg_rating}
          borderLeft
          borderRightOnMobile={true}
        />
        <Detail
          title="Sold"
          content={total_ratings}
          borderLeft
          borderRight
          dontShowOnMobile
        />
        <Detail title="On Sale" content={onSale ? "Yes" : "No"} />
      </div>
    </div>
  );
};
