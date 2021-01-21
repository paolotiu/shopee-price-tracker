import React from "react";
import { Background } from "../Background/Background";
import { Sidebar } from "../General/Sidebar";

export const MainContent: React.FC = ({ children }) => {
  return (
    <>
      <Background />
      <main className="grid h-full grid-flow-col auto-cols-auto content-with-sidebar">
        <Sidebar />
        <div className="p-8 md:p-20">{children}</div>
      </main>
    </>
  );
};