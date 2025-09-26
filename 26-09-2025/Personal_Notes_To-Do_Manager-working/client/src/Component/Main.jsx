import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <main className="w-full h-screen  grid grid-cols-2 bg-black text-white   text-[200px] font-extralight  ">
      <div className="h-full hover:shadow-2xl hover:shadow-indigo-300 flex justify-around items-center hover:inset-ring-2 hover:inset-ring-indigo-300 ">
        <Link
          to={"/todo"}
          className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800"
        >
          Task
        </Link>
      </div>
      <div className="h-full hover:shadow-2xl hover:shadow-indigo-300 flex justify-around items-center hover:inset-ring-2 hover:inset-ring-indigo-300">
        <Link
          to={"/notes"}
          className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800"
        >
          Note
        </Link>
      </div>
    </main>
  );
};

export default Main;
