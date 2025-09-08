import React from "react";
import { useState } from "react";
import { io } from "socket.io-client";

const socket = io();

const Chat = () => {
  const [input, setInput] = useState("");

  function handleClick(e) {
    e.preventDefault();
    console.log(input);
    socket.emit("message", input);
    setInput(" ");
  }
  return (
    <>
      <title>Socket.io Tutorial</title>
      <h1>Socket.io Tutorial</h1>
      <div id="messages" />
      <input id="message-input" onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type your message here" />
      <button id="send-button" onClick={handleClick}>
        Send
      </button>
    </>
  );
};

export default Chat;
