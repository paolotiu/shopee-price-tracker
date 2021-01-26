import React from "react";
import Blob from "../Blob/Blob";
interface Props {
  showBottomBlob?: boolean;
}
export const Background = ({ showBottomBlob = true }: Props) => {
  const blobs = showBottomBlob ? [5, 6, 7] : [5, 6];
  return (
    <>
      {blobs.map((x, i) => (
        <React.Fragment key={i}>
          {" "}
          <Blob num={x} />{" "}
        </React.Fragment>
      ))}
    </>
  );
};
