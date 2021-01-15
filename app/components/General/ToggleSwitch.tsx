import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../DarkModeContext";
import Moon from "../../public/moon.svg";
// interface Props {}

export const ToggleSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  const [isChecked, setIsChecked] = useState(false);

  const switchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Change switch whenever theme changes
    setIsChecked(theme === "dark");
  }, [theme]);

  return (
    <>
      <div className="flex items-center relative">
        <Moon className="w-5" />
        <div className="relative inline-block w-10 mx-2 align-middle select-none transition duration-400 ease-in-out">
          <input
            type="checkbox"
            ref={switchRef}
            className={
              "cursor-pointer appearance-none w-6 h-6 absolute -left-1  rounded-full bg-white top-1/2 transform  -translate-y-1/2 transition duration-500 checked:translate-x-full "
            }
            onChange={() => {
              // Changes theme, so triggers a useEffect
              toggleTheme();
            }}
            checked={isChecked}
          />
          <div
            className={
              isChecked
                ? "w-full h-5 bg-black  rounded-full  transition duration-500"
                : "w-full h-5 bg-gray-300  rounded-full  transition duration-500"
            }
          ></div>
        </div>
      </div>
    </>
  );
};
