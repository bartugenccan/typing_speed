import React, { useState, useEffect } from "react";

interface Props {
  startCounting: boolean;
  correctWords: number;
}

const Timer: React.FC<Props> = ({ startCounting, correctWords }) => {
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  useEffect(() => {
    if (startCounting) {
      const interval = setInterval(() => {
        setTimeElapsed((oldSpeed) => oldSpeed + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startCounting]);

  const minutes = timeElapsed / 60;

  return (
    <div>
      <p> Time: {timeElapsed} </p>
      <p>Speed: {(correctWords / minutes || 0).toFixed(2)} WPM</p>
    </div>
  );
};

export default Timer;
