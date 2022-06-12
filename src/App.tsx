import React, { useEffect, useState } from "react";
import axios from "axios";

// spinner
import { SpinnerDotted } from "spinners-react";

// components
import Word from "./components/Word";
import Timer from "./components/Timer";
import Header from "./components/Header";

const App = () => {
  // words states
  const [userInput, setUserInput] = useState<string>("");
  const [words, setWords] = useState<string[]>([]);
  const [activeWordIndex, setActiveWordIndex] = useState<number>(0);
  const [correctWords, setCorrectWords] = useState<string[]>([]);
  const [incorrectWords, setIncorrectWords] = useState<string[]>([]);

  // timer states
  const [startCounting, setStartCounting] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  // loading
  const [loading, setLoading] = useState<boolean>(false);

  const getWords = async () => {
    setLoading(true);
    const { data } = await axios.get(
      "https://random-word-api.herokuapp.com/all"
    );
    const newList = shuffle(data);
    setWords(newList.slice(0, 20));
    setLoading(false);
  };

  useEffect(() => {
    getWords();
  }, []);

  const shuffle = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const checkInput = (value: string) => {
    if (activeWordIndex === words.length) {
      return;
    }

    setStartCounting(true);

    if (value.endsWith(" ")) {
      if (activeWordIndex === words.length - 1) {
        setStartCounting(false);
        setUserInput("Finished");
      } else {
        setUserInput("");
      }
      setActiveWordIndex(activeWordIndex + 1);

      const word = value.trim();
      if (word === words[activeWordIndex]) {
        setCorrectWords([...correctWords, word]);
      } else {
        setIncorrectWords([...incorrectWords, words[activeWordIndex]]);
      }
    } else {
      setUserInput(value);
    }
  };

  const restartGame = () => {
    getWords();
    setUserInput("");
    setActiveWordIndex(0);
    setTimeElapsed(0);
    setCorrectWords([]);
    setIncorrectWords([]);
    setStartCounting(false);
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <Header restartGame={restartGame} />
      {loading ? (
        <div className="flex justify-center">
          <div className="spinner">
            <SpinnerDotted />
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center">
            <Timer
              startCounting={startCounting}
              correctWords={correctWords.length}
              timeElapsed={timeElapsed}
              setTimeElapsed={setTimeElapsed}
            />
            <p className=" w-1/2 border-green-500 border-4 p-8 rounded-lg">
              {words.map((word, index) => (
                <Word
                  key={index}
                  text={word}
                  active={index === activeWordIndex}
                  correct={correctWords.includes(word)}
                  incorrect={incorrectWords.includes(word)}
                />
              ))}
            </p>
          </div>

          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-1/2 py-2 px-4 mt-12 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
            type="text"
            value={userInput}
            onChange={(e) => checkInput(e.target.value)}
            placeholder="Type here..."
          />
        </>
      )}
    </div>
  );
};

export default App;
