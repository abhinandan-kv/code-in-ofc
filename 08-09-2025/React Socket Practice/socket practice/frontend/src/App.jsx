import { useEffect } from "react";
import "./App.css";
import { io } from "socket.io-client";
import socketClient from "socket.io-client";
import { useState } from "react";

const SERVER = "localhost:9000";

function App() {
  const [room, setRoom] = useState("");

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const socket = io.connect(SERVER);
  // let socket = socketClient(SERVER);
  socket.on("connection", () => {
    console.log(`I'm connected with the back-end`);
  });

  function joinRoom(e) {
    if (room != "") {
      socket.emit("join_room", room);
    }
  }

  function sendMessage(e) {
    socket.emit("send_message", { message, room });
  }

  // function handleClick(e) {
  //   e.preventDefault();
  //   socket.emit("Send_Message", { message });
  // }

  function handleDisconnect(e) {
    socket.disconnect();
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      // alert(data);
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <>
      <div>
        <input
          placeholder="room number"
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />
        <button onClick={joinRoom}>Join Room</button>

        <input onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessage}>Submit</button>

        <h1>message:</h1>
        {messageReceived}
      </div>

      <div>
        <button onClick={handleDisconnect}>Disconnect</button>
      </div>
    </>
  );
}

export default App;
