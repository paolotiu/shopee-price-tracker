import dynamic from "next/dynamic";
import React from "react";
const Background = dynamic(
  () =>
    import("components/Background/Background").then((mod) => mod.Background)!
);
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
