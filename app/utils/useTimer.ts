import { useEffect, useState } from "react";

export const useTimer = (): [
  number,
  React.Dispatch<React.SetStateAction<number>>
] => {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (!seconds) return;
    const timer = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);
  return [seconds, setSeconds];
};
