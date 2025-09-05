import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./Chat.scss";
import socketClient from "socket.io-client";
import Chat from "./Components/Chat";

const SERVER = "localhost:9000";

function App() {
  let socket = socketClient(SERVER);
  socket.on("connection", () => {
    console.log(`I'm connected with the back-end`);
  });

  return (
    <>
      <Chat />
    </>
  );
}

export default App;
