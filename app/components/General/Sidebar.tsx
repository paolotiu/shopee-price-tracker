import React from "react";
import { logOut } from "../../utils/api";
import { useRouter } from "next/router";
import Link from "next/link";
interface Props {
  isOpen: boolean;
  closeSidebar: () => void;
}
export const Sidebar = ({ isOpen, closeSidebar }: Props) => {
  const router = useRouter();
  const isHome = router.route.includes("/home");
  return (
    <div
      className={`fixed  top-0 left-0 flex flex-col  w-screen h-screen  text-xl text-white  md:flex-col bg-black-lighter bg-opacity-60 transition duration-500 ${
        isOpen ? "opacity-100 " : "opacity-0 max-w-0  delay-1000"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        closeSidebar();
      }}
    >
      <div
        className={`w-8/12 h-full  max-w-sm  bg-white dark:bg-black rounded-r-lg transition duration-700 delay-100 ${
          isOpen ? "transform -translate-x-0" : "transform -translate-x-full"
        }`}
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
          className="absolute pl-8 text-red-400 bottom-6 max-w-min"
          onClick={async () => {
            await logOut();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
