import React, { useEffect, useState } from "react";
import Moon from "../../public/moon.svg";
import Sun from "../../public/sun.svg";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, themeSelector, toggleTheme } from "../../slices/themeSlice";
import { motion } from "framer-motion";

// interface Props {}

export const ToggleSwitch = () => {
  const dispatch = useDispatch();
  const theme = useSelector(themeSelector);
  const [isChecked, setIsChecked] = useState(theme === "dark");

  useEffect(() => {
    setIsChecked(theme === "dark");
  }, [theme]);
  return (
    <>
      <motion.div className="relative flex items-center">
        <button
          aria-label="toggle light-mode"
          onClick={() => {
            dispatch(setTheme("light"));
          }}
        >
          <Sun className="w-6 h-auto" />
        </button>
        <div className="relative inline-block w-10 ml-3 mr-4 align-middle transition ease-in-out select-none duration-400">
          <motion.input
            id="toggle-switch"
            type="checkbox"
            className={
              "cursor-pointer appearance-none w-6 h-6 absolute -left-1  rounded-full bg-white top-1/2 transform  -translate-y-1/2 transition duration-500 checked:translate-x-full "
            }
            onClick={() => {
              // Changes theme, so triggers a useEffect
              dispatch(toggleTheme());
            }}
            // onChange doesn't work on first click, so for now it'll be using onCLick
            onChange={() => {}}
            onPan={(e, info) => {
              if (info.offset.x > 0) {
                dispatch(setTheme("dark"));
              } else {
                dispatch(setTheme("light"));
              }
            }}
            checked={isChecked}
          />
          <div className="w-full h-5 transition duration-500 bg-gray-300 rounded-full dark:bg-black"></div>
        </div>
        <button
          aria-label="toggle dark-mode"
          onClick={() => {
            dispatch(setTheme("dark"));
          }}
        >
          <Moon className="w-5 h-auto" />
        </button>
      </motion.div>
    </>
  );
};
