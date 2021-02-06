import React from "react";
import { Item } from "utils/api";
import { ItemDetail } from "./ItemDetail";

interface Props {
  item: Item;
}

const ItemDetailContainer = ({ item: rawitem }: Props) => {
  const item = rawitem.item;

  return (
    <div className="grid grid-cols-2 py-4 md:text-lg gap-x-4 gap-y-4 sm:gap-y-7 sm:grid-cols-3 whitespace-nowrap">
      <ItemDetail
        img="/free_shipping.svg"
        title="Free Shipping:"
        detail={item?.free_shipping ? "Yes" : "No"}
      />
      <ItemDetail
        img="/discount.svg"
        title="Discount:"
        detail={item?.discount ? item.discount + "%" : "None"}
      />
      <ItemDetail
        img="/star.svg"
        title="Rating:"
        detail={
          item?.avg_rating ? Math.round(item?.avg_rating * 100) / 100 : ""
        }
      />
      <ItemDetail
        img="/sold.svg"
        title="Sold:"
        detail={item?.historical_sold}
      />
      <ItemDetail img="/heart.svg" title="Likes:" detail={item?.likes} />
      <ItemDetail img="/eye.svg" title="Views:" detail={item?.views} />
    </div>
  );
};

export default ItemDetailContainer;
