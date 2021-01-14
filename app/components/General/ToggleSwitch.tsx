import React, { useEffect, useRef, useState } from "react";
import { useChangeDark, useIsDark } from "../../pages/_app";
import Moon from "../../public/moon.svg";
// interface Props {}

export const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(useIsDark());
  const changeDark = useChangeDark();
  const switchRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="flex items-center relative">
        <Moon className="w-5" />
        <div className="relative inline-block w-10 mx-2 align-middle select-none transition duration-400 ease-in-out">
          <input
            type="checkbox"
            ref={switchRef}
            className={
              isChecked
                ? "cursor-pointer appearance-none w-6 h-6 absolute -left-1  rounded-full bg-white top-1/2 transform  -translate-y-1/2 transition duration-500 checked:translate-x-full "
                : "cursor-pointer appearance-none w-6 h-6 absolute -left-1  rounded-full bg-white top-1/2 transform  -translate-y-1/2 transition duration-500 checked:translate-x-full "
            }
            onChange={(e) => {
              setIsChecked(e.target.checked);
              changeDark();
            }}
            checked={isChecked}
          />
          <div
            className={
              isChecked
                ? "w-full h-5 bg-gray-300 rounded-full  transition duration-500"
                : "w-full h-5 bg-black rounded-full  transition duration-500"
            }
          ></div>
        </div>
      </div>
    </>
  );
};
