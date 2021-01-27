import React from "react";
import { Background } from "../Background/Background";

interface Props {
  showBottomBlob?: boolean;
  showBackground?: boolean;
}
export const MainContent: React.FC<Props> = ({
  children,
  showBottomBlob,
  showBackground = true,
}) => {
  return (
    <>
      <main className="grid grid-flow-col mt-28 auto-cols-auto ">
        {showBackground && <Background showBottomBlob={showBottomBlob} />}
        <div>{children}</div>
      </main>
    </>
  );
};
