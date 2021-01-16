import React from "react";
import Circle from "../../public/circle.svg";
interface Props {}

export const Background = (props: Props) => {
  return (
    <svg width="100%" height="100vh">
      <defs>
        <pattern
          id="polka-dots"
          x="0"
          y="0"
          width="30"
          height="30"
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx="10"
            cy="10"
            r="2"
            className="text-black dark:text-white fill-current"
          />
        </pattern>
      </defs>

      <rect x="0" y="0" width="100%" height="100%" fill="url(#polka-dots)" />
    </svg>
  );
};
