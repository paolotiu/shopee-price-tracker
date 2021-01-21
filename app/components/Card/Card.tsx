import React from "react";
import Clamp from "react-multiline-clamp";
import { Detail } from "./Detail";

interface Props {
  title: string;
  desc: string;
  price: string | number;
}

export const Card = ({ title, desc, price }: Props) => {
  return (
    <div className="flex flex-col justify-between w-full max-w-lg transition duration-1000 p-7 dark:bg-white bg-primary-dark ">
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
        <Detail title="Price" content="P250" />
        <Detail
          title="Reviews"
          content="9000"
          borderLeft
          borderRightOnMobile={true}
        />
        <Detail
          title="Price"
          content="P250"
          borderLeft
          borderRight
          dontShowOnMobile
        />
        <Detail title="Price" content="P250" />
      </div>
    </div>
  );
};
