import React from "react";
import { Background } from "../Background/Background";

export const MainContent: React.FC = ({ children }) => {
  return (
    <>
      <main className="grid grid-flow-col mt-28 auto-cols-auto ">
        <Background />
        <div>{children}</div>
      </main>
    </>
  );
};
