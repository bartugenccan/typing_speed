import React, { ReactEventHandler, useEffect, useState } from "react";
import axios from "axios";

// components
import Word from "./components/Word";
import Timer from "./components/Timer";

const App = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [words, setWords] = useState<string[]>([]);
  const [activeWordIndex, setActiveWordIndex] = useState<number>(0);
  const [correctWords, setCorrectWords] = useState<string[]>([]);
  const [incorrectWords, setIncorrectWords] = useState<string[]>([]);
  const [startCounting, setStartCounting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getWords = async () => {
    const list = await axios.get("https://random-word-api.herokuapp.com/all");

    const newList = shuffle(list.data);
    setWords(newList.slice(0, 20));
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

  return (
    <div>
      <h1>Typing Speed Test</h1>
      <Timer
        startCounting={startCounting}
        correctWords={correctWords.filter(Boolean).length}
      />
      <p>
        {words.map((word, index) => {
          return (
            <Word
              key={index}
              text={word}
              active={index === activeWordIndex}
              correct={correctWords.includes(word)}
              incorrect={incorrectWords.includes(word)}
            />
          );
        })}
      </p>

      <input
        className="border-2 border-gray-600 p-2"
        placeholder="Type here..."
        type="text"
        value={userInput}
        onChange={(e) => checkInput(e.target.value)}
      />
    </div>
  );
};

export default App;
