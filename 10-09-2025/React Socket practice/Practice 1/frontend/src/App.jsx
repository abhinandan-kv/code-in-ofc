import "./App.css";
import { io } from "socket.io-client";
import UserName from "./component/UserName";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./component/Chat";

export const socket = io("http://localhost:3000");

function App() {
  return (
    <>
      {/* <Socket /> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserName />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
