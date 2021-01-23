import React from "react";
import Blob1 from "../../public/blobs/blob1.svg";
import Blob2 from "../../public/blobs/blob2.svg";
import Blob3 from "../../public/blobs/blob3.svg";
import Blob4 from "../../public/blobs/blob4.svg";
import Blob5 from "../../public/blobs/blob5.svg";

const blobs = [
  <Blob1 className="top-0 right-0 hidden blob md:block md:max-h-96 lg:max-h-70vh z--1" />,
  <Blob2 className="top-0 left-0 hidden w-full blob md:w-auto lg:max-h-70vh md:block md:max-h-96 z--1" />,
  <Blob3 className="bottom-0 left-0 hidden blob md:block z--1" />,
  <Blob4 className="top-0 w-full blob md:hidden z--1" />,
  <Blob5 className="bottom-0 left-0 blob md:hidden z--1" />,
  <Blob1 className="top-0 right-0 homeBlob max-h-56 dark:opacity-100 z--1" />,
  <Blob2 className="top-0 left-0 homeBlob md:w-auto w-96 dark:opacity-100 lg:max-h-70vh md:block md:max-h-96 z--1" />,
  <Blob3 className="bottom-0 left-0 homeBlob dark:opacity-100 md:block z--1" />,
];

interface Props {
  num: number;
}
const Blob = ({ num }: Props) => {
  return blobs[num];
};

export default Blob;
