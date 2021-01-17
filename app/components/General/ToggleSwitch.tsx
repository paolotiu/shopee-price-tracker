import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../../utils/DarkModeContext";
import Moon from "../../public/moon.svg";
import Sun from "../../public/sun.svg";

// interface Props {}

export const ToggleSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  const [isChecked, setIsChecked] = useState(theme === "dark");

  const switchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Change switch whenever theme changes
    setIsChecked(theme === "dark");
  }, [theme]);

  return (
    <>
      <div className="flex items-center relative">
        <button onClick={() => toggleTheme("dark")}>
          <Sun className="w-6 h-auto" />
        </button>
        <div className="relative inline-block w-10 ml-3 mr-4 align-middle select-none transition duration-400 ease-in-out">
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
          <div className="w-full h-5 dark:bg-black bg-gray-300  rounded-full  transition duration-500"></div>
        </div>
        <button onClick={() => toggleTheme("light")}>
          <Moon className="w-5 h-auto" />
        </button>
      </div>
    </>
  );
};
