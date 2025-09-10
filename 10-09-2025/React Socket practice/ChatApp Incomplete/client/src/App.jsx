import React, { useEffect, useRef, useState } from "react";
import { socket } from "./socket";
import { Toaster, toast } from "sonner";

export default function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const typingTimeout = useRef(null);

  useEffect(() => {
    socket.on("connect", () => console.log("connected", socket.id));
    socket.on("message", (m) => setMessages((p) => [...p, m]));
    socket.on("room_message", (m) => setMessages((p) => [...p, m]));
    socket.on("private_message", (m) => setMessages((p) => [...p, { ...m, private: true }]));
    socket.on("system_message", (m) => setMessages((p) => [...p, { ...m, system: true }]));
    socket.on("user_list", (list) => setUsers(list));
    socket.on("typing", ({ from }) => {
      setMessages((p) => [...p, { system: true, text: `${from} is typing...` }]);
      clearTimeout(typingTimeout.current);
      typingTimeout.current = setTimeout(() => {
        setMessages((p) => p.filter((x) => x.text !== `${from} is typing...`));
      }, 1200);
    });
    return () => socket.removeAllListeners();
  }, []);

  const joinChat = (e) => {
    e.preventDefault();
    if (!username) return;
    socket.connect();
    socket.emit("join", { username, room: room || null });
    setJoined(true);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!msg) return;
    const payload = { content: msg };
    if (selectedUser) payload.to = selectedUser;
    else if (room) payload.room = room;
    socket.emit("send_message", payload);
    setMsg("");
  };

  const handleTyping = () => socket.emit("typing", { to: selectedUser || null, room: room || null });

  if (!joined) {
    toast("For Group Chat enter Same room id");
    
    return (
      <>
        <Toaster />

        <div className="h-screen flex items-center justify-center bg-black">
          <form onSubmit={joinChat} className="bg-white p-8 rounded-2xl shadow-lg space-y-4 w-80">
            <h2 className="text-xl font-bold text-center">Join Chat</h2>
            <input className="w-full border rounded-lg p-2" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input className="w-full border rounded-lg p-2" placeholder="Room (optional)" value={room} onChange={(e) => setRoom(e.target.value)} />
            <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600">
              Join
            </button>
          </form>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster />
      <div className="h-screen flex">
        <div className="w-64 bg-white border-r p-4 flex flex-col">
          <h3 className="text-lg font-semibold mb-2">Online Users</h3>
          <ul className="flex-1 overflow-y-auto space-y-1">
            {users.map((u) => (
              <li key={u}>
                <button
                  onClick={() => {
                    setSelectedUser(u);
                    setRoom("");
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg ${selectedUser === u ? "bg-indigo-500 text-white" : "hover:bg-gray-100"}`}
                >
                  {u}
                </button>
              </li>
            ))}
          </ul>
          <div className="text-sm text-gray-500 mt-4">
            Target:
            {selectedUser ? `Private -> ${selectedUser}` : room ? `Room -> ${room}` : "Everyone"}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`${m.system ? "text-gray-500 italic" : m.private ? "bg-yellow-100 p-2 rounded-lg" : "bg-blue-100 p-2 rounded-lg"}`}
              >
                {m.system ? (
                  <span>{m.text || m.content}</span>
                ) : (
                  <div>
                    <span className="font-semibold">{m.from}</span>: {m.content}
                    <div className="text-xs text-gray-500">{new Date(m.time || Date.now()).toLocaleTimeString()}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="flex border-t p-3 bg-gray-50 space-x-2">
            <input
              className="flex-1 border rounded-lg px-3 py-2"
              placeholder="Type a message..."
              value={msg}
              onChange={(e) => {
                setMsg(e.target.value);
                handleTyping();
              }}
            />
            <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">Send</button>
          </form>
        </div>
      </div>
    </>
  );
}
