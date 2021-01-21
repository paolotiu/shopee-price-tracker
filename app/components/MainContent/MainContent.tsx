import React from "react";
import { Background } from "../Background/Background";
import { Sidebar } from "../General/Sidebar";

export const MainContent: React.FC = ({ children }) => {
  return (
    <>
      <Background />
      <main
        className="grid h-full gap-28"
        style={{ gridTemplateColumns: "auto 1fr" }}
      >
        <Sidebar />
        <div>{children}</div>
      </main>
    </>
  );
};
