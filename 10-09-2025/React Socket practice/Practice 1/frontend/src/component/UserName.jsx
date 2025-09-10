import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { socket } from "../App";

const UserName = () => {
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");

  const [joined, setJoined] = useState(false);

  function handleClick(e) {
    //joinChat trigger
    // socket.emit("chat_message", input);
    e.preventDefault();
    if (!input) return;
    socket.connect();
    socket.emit("join", { input, room: input2 || null });
    setJoined(true);
  }
  return (
    <>
      <div className="flex w-screen h-screen justify-center items-center ">
        <div className="flex flex-col min-w-72 bg-fuchsia-900 text-white gap-4 p-5   ">
          <input className="border p-1 outline-0" placeholder="Enter Username" required onChange={(e) => setInput(e.target.value)} />
          <input className="border p-1 outline-0" placeholder="Enter Room Id(optional)" onChange={(e) => setInput2(e.target.value)} />

          <button className="bg-black hover:bg-slate-900 " onClick={handleClick}>
            <Link to="/chat">Confirm</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default UserName;
