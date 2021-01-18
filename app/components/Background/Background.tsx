import React from "react";
import Blob from "../Blob/Blob";

export const Background = () => {
  return (
    <>
      {[5, 6, 7].map((x, i) => (
        <React.Fragment key={i}>
          {" "}
          <Blob num={x} />{" "}
        </React.Fragment>
      ))}
    </>
  );
};
