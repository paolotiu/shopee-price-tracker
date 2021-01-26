import React from "react";
import { Background } from "../Background/Background";

interface Props {
  showBottomBlob?: boolean;
}
export const MainContent: React.FC<Props> = ({ children, showBottomBlob }) => {
  return (
    <>
      <main className="grid grid-flow-col mt-28 auto-cols-auto ">
        <Background showBottomBlob={showBottomBlob} />
        <div>{children}</div>
      </main>
    </>
  );
};
