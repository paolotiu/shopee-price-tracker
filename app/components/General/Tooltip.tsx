import React, { useState } from "react";
import { useIsMobile } from "../../utils/useIsMobile";

interface Props {
  text: string;
}

export const Tooltip: React.FC<Props> = ({ children, text }) => {
  const [isHover, setIsHover] = useState(false);
  const isMobile = useIsMobile();
  return (
    <div>
      <span
        onMouseOver={() => (isMobile ? "" : setIsHover(true))}
        onMouseLeave={() => setIsHover(false)}
        onClick={() => setIsHover(!isHover)}
      >
        {children}
      </span>
      <span
        className={`absolute h-auto p-2 text-xs font-normal text-white break-words whitespace-normal transform translate-x-full -translate-y-full rounded bg-black-lighter w-28 -top-1 -right-4 bg-opacity-70 ${
          isHover ? "block" : "hidden"
        }`}
      >
        {text}
      </span>
    </div>
  );
};
