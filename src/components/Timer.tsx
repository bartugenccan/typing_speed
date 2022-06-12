import React, { useState, useEffect } from "react";

interface Props {
  startCounting: boolean;
  correctWords: number;
  timeElapsed: number;
  setTimeElapsed: React.Dispatch<React.SetStateAction<number>>;
}

const Timer: React.FC<Props> = ({
  startCounting,
  correctWords,
  timeElapsed,
  setTimeElapsed,
}) => {
  useEffect(() => {
    if (startCounting) {
      const interval = setInterval(() => {
        setTimeElapsed((oldSpeed) => oldSpeed + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startCounting]);

  const minutes = timeElapsed / 60;
  const WPM = correctWords / minutes;

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center">
        <div className="text-6xl font-bold">Time: {timeElapsed}</div>
        <div className="text-4xl font-bold">{(WPM | 0).toFixed(2)} WPM</div>
      </div>
    </div>
  );
};

export default Timer;
