import Router from "next/router";
import React from "react";
import { logOut } from "../../utils/api";

export const Sidebar = () => {
  return (
    <div className="hidden h-full p-6 text-xl transition duration-1000 md:flex-col md:justify-between md:flex w-72 bg-black-lighter">
      <div className="flex flex-col">
        <span>Home</span>
        <span>Account</span>
      </div>
      <button
        onClick={async () => {
          await logOut();
          Router.push("/");
        }}
      >
        Logout
      </button>
    </div>
  );
};
