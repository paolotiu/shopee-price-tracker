import React from "react";

interface Props {
  img: string;
  title: string;
  detail: string | number | undefined;
}

export const ItemDetail = ({ img, title, detail }: Props) => {
  return (
    <p className="flex items-center">
      {<img src={img} alt="" className="inline-block w-5 mr-1" />}
      {title} &nbsp; <span className="font-bold">{detail}</span>
    </p>
  );
};
