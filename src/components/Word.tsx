import React from "react";

interface Props {
  text: string;
  active: boolean;
  correct: boolean;
  incorrect: boolean;
}

const Word: React.FC<Props> = ({ text, active, correct, incorrect }) => {
  if (correct) {
    return <span className="font-bold text-green-500 "> {text} </span>;
  }
  if (incorrect) {
    return <span className="font-bold text-red-600 "> {text} </span>;
  }
  if (active) {
    return <span className="font-bold "> {text}</span>;
  }

  return <span> {text} </span>;
};

export default Word;
