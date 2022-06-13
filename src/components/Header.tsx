import React from "react";

interface Props {
  restartGame: () => void;
}

const Header: React.FC<Props> = ({ restartGame }) => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-green-500 p-6 w-full md:fixed top-0">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          Typing Speed Test App
        </span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a
            href="https://www.linkedin.com/in/bartugenccan/"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Linkedin
          </a>
          <a
            href="https://github.com/bartugenccan"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Github
          </a>
          <a
            href="mailto: bartugenccan@gmail.com"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
          >
            Contact
          </a>
        </div>
        <div>
          <button
            onClick={restartGame}
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          >
            Restart
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
