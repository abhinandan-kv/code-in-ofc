import { useState } from "react";
import { socket } from "../App";
import { useEffect } from "react";

const Chat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [room, setRoom] = useState("");

  useEffect(() => {
    socket.on("connection", () => console.log("connected", socket.id));

    socket.on("message", (msg) => setMessages((prev) => [...prev, msg]));
    socket.on("room_message", (msg) => setMessages((prev) => [...prev, msg]));
    socket.on("private_message", (msg) => setMessages((prev) => [...prev, { ...msg, private: true }]));
    socket.on("system_message", (msg) => setMessages((prev) => [...prev, { ...msg, private: true }]));
    socket.on("user_list", (userList) => setUsers(userList));

    return () => socket.removeAllListeners();
  }, []);

  function handleClick(e) {
    //send message
    // socket.emit("chat_message", input);
    e.preventDefault();
    if (!input) return;
    const payload = { content: input };
    if (selectedUser) payload.to = selectedUser;
    else if (room) payload.room = room;
    socket.emit("send_message", payload);
    setInput("");
  }

  return (
    <div className=" flex min-h-screen  m-3 gap-2 text-white">
      <div className="justify-start bg-slate-950 min-w-56 border-2 rounded-2xl border-white p-2  ">
        <ul>
          {users.map((val, idx) => {
            <li key={idx}>
              <button
                onClick={() => {
                  setSelectedUser(val);
                  setRoom("");
                }}
                className={`w-full text-left px-3 py-2 rounded-lg ${selectedUser === val ? "bg-indigo-500 text-white" : "hover:bg-gray-100"}`}
              >
                {val}
              </button>
            </li>;
          })}
        </ul>
        <div className="text-sm text-gray-500 mt-4">
          Target:
          {selectedUser ? `Private -> ${selectedUser}` : room ? `Room -> ${room}` : "Everyone"}
        </div>
      </div>
      <div className="bg-gray-950 w-full border-2 rounded-2xl border-white p-2 ">
        <div className="bg-gray-900 h-full justify-between flex flex-col ">
          <div className="bg-black p-2 rounded-xl text-white shadow-lg shadow-gray-400 ">Username</div>
          <div className="m-2 flex gap-1">
            <input
              className="text-white outline-0 border-1 border-grey-300 w-full p-2 rounded-xl"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter Message"
            />
            <button className="bg-black p-2 px-5 rounded-xl hover:bg-red-600 border-0" onClick={handleClick}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
