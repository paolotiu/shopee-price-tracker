import React, { useEffect } from "react";
import { logOut } from "../../utils/api";
import { useRouter } from "next/router";
import Link from "next/link";
import tw from "twin.macro";
import { motion, Variants } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { directSidebar, sidebarSelector } from "../../slices/uiSlice";

const Sidebar = () => {
  const router = useRouter();
  const isOpen = useSelector(sidebarSelector);
  const dispatch = useDispatch();
  const isHome = router.route === "/home";

  const backgroundVariant: Variants = {
    close: {
      opacity: 0,
      pointerEvents: "none",

      transition: {
        delay: 0.05,
        when: "afterChildren",
      },
    },
    open: { opacity: 100, pointerEvents: "auto" },
  };

  const contentVariant: Variants = {
    close: {
      x: -500,
    },
    open: { x: 0 },
  };

  useEffect(() => {}, []);
  return (
    <motion.div
      css={[
        tw`fixed top-0 left-0 flex flex-col w-screen h-screen overflow-hidden text-xl text-white transition duration-500 md:flex-col bg-black-lighter bg-opacity-60`,
      ]}
      initial={"close"}
      animate={isOpen ? "open" : "close"}
      variants={backgroundVariant}
      onClick={(e) => {
        e.stopPropagation();
        dispatch(directSidebar(false));
      }}
    >
      <motion.div
        animate={isOpen ? "open" : "close"}
        transition={{ duration: 0.05 }}
        variants={contentVariant}
        className={`w-8/12 h-full relative  max-w-sm  bg-white dark:bg-black rounded-r-lg transition duration-700 delay-100`}
      >
        <div className="grid pt-40 overflow-hidden text-xl text-black dark:text-white">
          <Link href="/home">
            <a
              className={
                isHome
                  ? "py-4 pl-8 transition duration-300 border-r-4 hover:bg-yellow-400 hover:bg-opacity-30 border-primary"
                  : "py-4 pl-8 transition duration-300  hover:bg-yellow-400 hover:bg-opacity-30"
              }
            >
              Home
            </a>
          </Link>
          <span className="py-4 pl-8 ">Account</span>
        </div>
        <button
          aria-label="logout"
          className="absolute ml-8 text-red-400 bottom-6 max-w-min"
          onClick={async () => {
            await logOut();
            router.push("/");
          }}
        >
          Logout
        </button>
      </motion.div>
    </motion.div>
  );
};
export default Sidebar;
