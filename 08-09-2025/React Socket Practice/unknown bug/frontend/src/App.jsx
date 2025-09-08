import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Chat from "./chat";
import { io } from "socket.io-client";
import socketClient from "socket.io-client";

const socket = io.connect();
// const SERVER = "";

function App() {
  // let socket = socketClient(SERVER);
  // socket.on("connection", () => {
  //   console.log(`I'm connected with the back-end`);
  // });

  function sendMessage() {
    // socket.emit()
  }

  return (
    <>
      <div className="App">
        <input placeholder="Message..." />
        <button onClick={sendMessage}>Send Message</button>
      </div>

      {/* <Chat /> */}
    </>
  );
}

export default App;
