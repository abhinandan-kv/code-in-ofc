import React, { useEffect, useRef, useState } from "react";
import { socket } from "./socket";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { Cookies } from "react-cookie";
import { FaPowerOff } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AiOutlinePaperClip } from "react-icons/ai";

export default function ChatPageNew() {
  const saved = localStorage.getItem("curr_user_detail");
  const parsed = saved ? JSON.parse(saved) : null;
  const [username, setUsername] = useState(parsed ? parsed.name : "");
  const [userEmail, setUserEmail] = useState(parsed ? parsed.email : "");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [users, setUsers] = useState([]); // array of {name,email,online}
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); // email
  const [selectedGroup, setSelectedGroup] = useState(null); // id
  const [groups, setGroups] = useState([]);
  const typingTimeout = useRef(null);

  const [showGroupModal, setShowGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);

  const [showMembersModal, setShowMembersModal] = useState(false); // changed to hover
  const [membersList, setMembersList] = useState({});
  const [selectedGroupName, setSelectedGroupName] = useState("");

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
      }, 1000);
    });

    return () => socket.removeAllListeners();
  }, []);

  useEffect(() => {
    const loadMeta = async () => {
      try {
        const ures = await axios.get("http://localhost:3000/chat/users");
        setUsers(ures.data);
      } catch (err) {
        console.error(err);
      }
      try {
        const gres = await axios.get("http://localhost:3000/chat/groups");
        setGroups(gres.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadMeta();
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        let params = {};
        if (selectedUser) params = { user1: userEmail, user2: selectedUser };
        else if (room) params = { room };
        else if (selectedGroup) params = { groupId: selectedGroup };
        if (Object.keys(params).length) {
          const res = await axios.get("http://localhost:3000/chat/messages", { params });
          setMessages(res.data);
        } else {
          setMessages([]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchHistory();
  }, [selectedUser, room, selectedGroup, userEmail]);

  const joinChat = async (e) => {
    e.preventDefault();
    if (!username || !userEmail) {
      // please set name and email in localStorage.curr_user_detail
      toast.error("Please Login Again");
      return;
    }

    socket.connect();
    socket.emit("join", { username, email: userEmail, room: room || null });
    setJoined(true);

    if (room) {
      try {
        await axios.post("http://localhost:3000/chat/groups", {
          name: room,
          members: [userEmail],
        });
      } catch (e) {
        console.log("group may already exist", e.message);
      }
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!msg) return;
    const payload = { content: msg };
    if (selectedUser) payload.to = selectedUser;
    else if (room) payload.room = room;
    else if (selectedGroup) payload.groupId = selectedGroup;
    socket.emit("send_message", payload);
    setMsg("");
  };

  const handleTyping = () =>
    socket.emit("typing", {
      to: selectedUser || null,
      room: room || null,
      groupId: selectedGroup || null,
    });

  useEffect(() => {
    if (!joined) {
      toast.info("For Group Chat enter Same room id");
    }
  }, [joined]);

  if (!joined) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <form onSubmit={joinChat} className="bg-black p-8 rounded-2xl shadow-lg space-y-4 w-80 shadow-xl/20 shadow-gray-300">
          <h2 className="text-xl font-bold text-center">Join Chat</h2>
          <input
            className="w-full border rounded-lg p-2 bg-black"
            placeholder="Room (optional)"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600">
            Join
          </button>
        </form>
      </div>
    );
  }

  return (
    <>
      <div className="h-screen flex flex-col">
        <div className="flex justify-between items-center px-6 py-3 bg-indigo-700 text-white shadow-md border-b border-indigo-500">
          <h1 className="text-lg font-semibold">Best ChatApp</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Logged in as</span>
            <span className="font-bold">{username}</span>
            {/* button is having some issue */}
            <button className="cursor-pointer" onClick={LogOut}>
              <FaPowerOff />
            </button>
          </div>
        </div>

        <div className="flex flex-1">
          {/* left sidepannel */}
          <div className="w-64 bg-black text-white border-r border-gray-500 p-4 flex flex-col ">
            <h3 className="text-lg font-semibold mb-2 border-b-1 border-gray-800">Users</h3>
            <ul className="flex-1 overflow-y-auto space-y-1">
              {users.map((u) => (
                <li key={u.email}>
                  <button
                    onClick={() => {
                      setSelectedUser(u.email);
                      setRoom("");
                      setSelectedGroup(null);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg ${selectedUser === u.email ? "bg-indigo-500 text-white" : "hover:bg-gray-500"}`}
                  >
                    <div className="flex justify-between">
                      <span>{u.name}</span>
                      <span className="text-xs text-gray-400">{u.online ? "online" : "offline"}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-semibold mt-4 flex justify-between items-center border-b-1 border-gray-800 ">
              Groups
              <button onClick={() => setShowGroupModal(true)} className="text-indigo-500 font-bold text-xl">
                +
              </button>
            </h3>
            <ul className="flex-1 overflow-y-auto space-y-1">
              {groups.map((g) => (
                <li
                  key={g.id}
                  className="relative group flex items-center justify-between "
                  onMouseEnter={async () => {
                    if (!membersList[g.id]) {
                      try {
                        const res = await axios.get(`http://localhost:3000/chat/groups/${g.id}/members`);
                        setMembersList((prev) => ({
                          ...prev,
                          [g.id]: res.data,
                        }));
                      } catch (err) {
                        toast.error("Failed to fetch members");
                      }
                    }
                  }}
                >
                  <button
                    onClick={() => {
                      setSelectedGroup(g.id);
                      setSelectedUser(null);
                      setRoom("");
                      socket.emit("join_group", {
                        username,
                        groupId: g.id,
                      });
                    }}
                    className={`flex-1 text-left px-3 py-2 rounded-lg ${selectedGroup === g.id ? "bg-indigo-500 text-white" : "hover:bg-gray-500"}`}
                  >
                    {g.name}
                  </button>

                  <div className="ml-2 relative">
                    <span className="cursor-pointer text-gray-500 hover:text-indigo-500">☰</span>

                    <div className="absolute right-0 top-full mt-1 hidden group-hover:block bg-gray-950  border border-gray-600 rounded-lg shadow-lg p-2 w-56 z-10">
                      <p className="font-semibold text-sm mb-2">Members</p>
                      {membersList[g.id] && membersList[g.id].length > 0 ? (
                        <ul className="space-y-1">
                          {membersList[g.id].map((m) => (
                            <li key={m.id} className="text-sm">
                              <span className="font-medium">{m.name}</span>
                              <div className="text-xs text-gray-500">{m.email}</div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-gray-400">No members</p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="text-sm text-gray-500 mt-4">
              Target:
              {selectedUser
                ? ` Private -> ${users.find((u) => u.email === selectedUser)?.name || selectedUser}`
                : room
                ? ` Room -> ${room}`
                : selectedGroup
                ? ` Group -> ${selectedGroup}`
                : " Everyone"}
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            {/* msg area center */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-black text-white">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`${
                    m.system
                      ? "text-gray-400 italic"
                      : m.private
                      ? "bg-linear-to-l from-zinc-500 via-stone-600 to-zinc-900 p-2 rounded-lg"
                      : "bg-linear-to-r from-pink-500 via-red-500 to-orange-500 p-2 rounded-lg"
                  }`} //  put gradient here -done
                >
                  {m.system ? (
                    <span>{m.text || m.content}</span>
                  ) : (
                    <div>
                      <span className="font-semibold">{m.fromName || m.from}</span>: {m.content}
                      <div className="text-xs text-gray-500">{new Date(m.time || Date.now()).toLocaleTimeString()}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* msg bottom area */}
            <form onSubmit={sendMessage} className="flex border-t border-gray-500 p-3 bg-black space-x-2">
              <input
                className="flex-1 border rounded-lg px-3 py-2 bg-black border-gray-500 text-white"
                placeholder="Type a message..."
                value={msg}
                onChange={(e) => {
                  setMsg(e.target.value);
                  handleTyping();
                }}
              />
              {/* <input type="file"/> */}
              {/* <AiOutlinePaperClip className="text-white"/> */}
              <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">Send</button>
            </form>
          </div>
        </div>
      </div>
      {showGroupModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-black text-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Create Group</h2>
            <input
              type="text"
              placeholder="Group Name"
              className="w-full border p-2 rounded mb-4 bg-black"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
            />

            <div className="max-h-40 overflow-y-auto mb-4">
              {users.map((u) => (
                <label key={u.email} className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    checked={selectedGroupMembers.includes(u.email)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedGroupMembers((prev) => [...prev, u.email]);
                      else setSelectedGroupMembers((prev) => prev.filter((x) => x !== u.email));
                    }}
                  />
                  <span>{u.name}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowGroupModal(false)} className="px-4 py-2 rounded bg-gray-600">
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    await axios.post("http://localhost:3000/chat/groups", {
                      name: newGroupName,
                      members: selectedGroupMembers,
                    });
                    toast.success("Group created!");
                    setShowGroupModal(false);
                    setNewGroupName("");
                    setSelectedGroupMembers([]);
                    const gres = await axios.get("http://localhost:3000/chat/groups");
                    setGroups(gres.data);
                  } catch (err) {
                    toast.error("Error creating group");
                  }
                }}
                className="px-4 py-2 rounded bg-indigo-500 text-white"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function LogOut() {
  const navigate = useNavigate();

  localStorage.clear();
  Cookies.remove("token");

  navigate("/login", { replace: true });
}
