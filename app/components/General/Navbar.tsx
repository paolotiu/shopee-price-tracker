import React from "react";
import Link from "next/link";
import { ToggleSwitch } from "./ToggleSwitch";
import Logo from "../../public/logo.svg";

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
  return (
    <nav
      className={
        isTransparent
          ? "flex items-center justify-between  p-5 "
          : "flex items-center justify-between  p-5 bg-primary dark:bg-primary-dark"
      }
      style={{ height: "min-content" }}
    >
      {showLogo ? (
        <Link href="/">
          <a>
            <Logo className="w-10" />
          </a>
        </Link>
      ) : (
        <>
          <Link href="/">
            <a className="md:block hidden">
              <Logo className="w-10" />
            </a>
          </Link>{" "}
        </>
      )}
      <div
        className={
          showLogin ? "sm:w-60 w-48 flex justify-around" : "flex justify-around"
        }
      >
        <ToggleSwitch />
        {showLogin && (
          <Link href="/login">
            <a className="underline-yellow transform hover:scale-110 transition duration-100">
              Login
            </a>
          </Link>
        )}
      </div>
    </nav>
  );
};
