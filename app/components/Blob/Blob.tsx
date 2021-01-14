import React from "react";
import Blob1 from "../../public/blobs/blob1.svg";
import Blob2 from "../../public/blobs/blob2.svg";
import Blob3 from "../../public/blobs/blob3.svg";
import Blob4 from "../../public/blobs/blob4.svg";
import Blob5 from "../../public/blobs/blob5.svg";

const blobs = [
  <Blob1 className="blob  top-0 right-0 hidden md:block md:max-h-96 lg:max-h-70vh z--1" />,
  <Blob2 className="blob md:w-auto w-full top-0 left-0 hidden lg:max-h-70vh md:block md:max-h-96 z--1" />,
  <Blob3 className="blob bottom-0 left-0 hidden md:block z--1" />,
  <Blob4 className="w-full blob  top-0 max-h-25vh md:hidden z--1" />,
  <Blob5 className="blob bottom-0 left-0 md:hidden z--1" />,
];

interface Props {
  num: number;
}
const Blob = ({ num }: Props) => {
  return blobs[num];
};

export default Blob;
