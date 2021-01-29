import React from "react";
import { Detail } from "./Detail";
import ClampLines from "react-clamp-lines";
interface Props {
  title: string;
  desc: string;
  price: string | number;
  onSale: boolean;
  sold: number;
  avg_rating: number;
}

export const Card = ({
  title,
  desc,
  price,
  onSale,
  sold,
  avg_rating,
}: Props) => {
  avg_rating = Math.round((avg_rating + Number.EPSILON) * 100) / 100;
  return (
    <div className="flex flex-col justify-between w-full h-full max-w-lg transition duration-1000 p-7 dark:bg-white bg-white-pure ">
      <div className="overflow-hidden">
        <ClampLines
          text={title}
          id="title"
          lines={3}
          innerElement="h1"
          className="pb-1 font-bold text-black-lighter"
        />
        <hr />

        <p className="flex items-center pt-2 overflow-hidden text-sm text-gray-400 pb-7">
          <span className="line-clamp">{desc}</span>
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
          content={sold}
          borderLeft
          borderRight
          dontShowOnMobile
        />
        <Detail title="On Sale" content={onSale ? "Yes" : "No"} />
      </div>
    </div>
  );
};
