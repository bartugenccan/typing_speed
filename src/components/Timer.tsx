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
    <div className="flex justify-center items-center mb-12">
      <div className="bg-green-500 p-5 rounded-xl mr-5 ">
        <span className="font-semibold text-5xl tracking-tight text-white">
          Time: {timeElapsed}
        </span>
      </div>
      <div className="text-5xl font-bold bg-green-500 p-5 rounded-xl">
        <span className="font-semibold text-5xl tracking-tight text-white">
          WPM: {(WPM | 0).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default Timer;
