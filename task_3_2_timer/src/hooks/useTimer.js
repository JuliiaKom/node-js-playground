import { useState, useEffect, useRef } from "react";

export default function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
  });

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const toggle = () => setIsRunning((prev) => !prev);

  const reset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setSeconds(0);
  };

  const time = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
    seconds % 60
  ).padStart(2, "0")}`;

  return {
    time,
    isRunning,
    toggle,
    reset,
    renderCount: renderCount.current,
  };
}
