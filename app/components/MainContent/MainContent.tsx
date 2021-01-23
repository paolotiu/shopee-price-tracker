import React from "react";
import { Background } from "../Background/Background";

export const MainContent: React.FC = ({ children }) => {
  return (
    <>
      <main className="grid h-full grid-flow-col mt-24 auto-cols-auto ">
        <Background />
        <div>{children}</div>
      </main>
    </>
  );
};
