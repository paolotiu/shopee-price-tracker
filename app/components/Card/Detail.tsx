import React from "react";

interface Props {
  title: string;
  content: string | number;
  borderLeft?: boolean;
  borderRight?: boolean;
  borderRightOnMobile?: boolean;
  dontShowOnMobile?: boolean;
}

export const Detail = ({
  title,
  content,
  borderLeft,
  borderRight,
  dontShowOnMobile,
  borderRightOnMobile,
}: Props) => {
  let wrapperClass =
    "w-full p-2 text-center text-white border-gray-500 border-opacity-50";
  if (borderLeft) {
    wrapperClass += " border-l-2 pl-2";
  }
  if (borderRight || borderRightOnMobile) {
    if (borderRightOnMobile) {
      wrapperClass += " md:border-r-0 border-r-2 pr-2";
    } else {
      wrapperClass += " border-r-2 pr-2";
    }
  }

  if (dontShowOnMobile) {
    // Dont show on mobile
    wrapperClass += " hidden md:block";
  }
  return (
    <div className={wrapperClass}>
      <h3 className="font-bold">{content}</h3>
      <p className="text-sm font-light md:text-base whitespace-nowrap">
        {title}
      </p>
    </div>
  );
};
