import React, { useState } from "react";
import Link from "next/link";
import { ToggleSwitch } from "./ToggleSwitch";
import Logo from "../../public/logo.svg";
import Bars from "../../public/bars.svg";

import { Sidebar } from "./Sidebar";

export interface NavProps {
  showLogin?: boolean;
  isTransparent?: boolean;
  showLogo?: boolean;
}
export const Navbar = ({
  showLogin = true,
  isTransparent = false,
  showLogo = true,
}: NavProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <nav
        className={
          isTransparent
            ? "flex items-center justify-between  p-5 fixed w-screen z-50"
            : "flex items-center justify-between  p-5 bg-primary dark:bg-primary-dark fixed w-screen z-50"
        }
        style={{ height: "min-content" }}
      >
        {showLogo ? (
          <Link href="/">
            <a>
              <Logo className="w-10 " />
            </a>
          </Link>
        ) : (
          <button
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
            }}
          >
            <Bars className="w-9" />
          </button>
        )}
        <div
          className={
            showLogin
              ? "sm:w-60 w-48 flex justify-around"
              : "flex justify-around"
          }
        >
          <ToggleSwitch />
          {showLogin && (
            <Link href="/login">
              <a className="transition duration-100 transform underline-yellow hover:scale-110">
                Login
              </a>
            </Link>
          )}
        </div>
        <Sidebar
          isOpen={isSidebarOpen}
          closeSidebar={() => {
            setIsSidebarOpen(false);
          }}
        />
      </nav>
    </>
  );
};
