import { Server } from "socket.io";
import { server } from "./index.js"
import { listAllUsers } from "./controllers/messageAutoController.js";

const io = new Server(server, {
  cors: { origin: process.env.frontend_URL },
});

// in memory
// const users = new Map(); // username -> socketId
const socketUser = new Map(); // socketId -> { username, room }

// get user data from db

const users = await listAllUsers()
console.log(users)


io.on("connection", (socket) => {
  console.log("socket connected", socket.id);

  socket.on("join", ({ username, room }) => {
    console.log(username, room)
    socketUser.set(socket.id, { username, room: room || null });
    // users.set(username, socket.id);

    if (room) socket.join(room);

    io.emit("user_list", users);
    io.emit("system_message", {
      text: `${username} joined${room ? " room " + room : ""}`,
      time: new Date().toISOString(),
    });
  });

  socket.on("send_message", ({ to, room, content }) => {
    const info = socketUser.get(socket.id) || {};
    const payload = {
      from: info.username || socket.id,
      content,
      time: new Date().toISOString(),
      to: to || null,
      room: room || null,
    };

    if (to) {
      const targetId = users.get(to);
      if (targetId) {
        io.to(targetId).emit("private_message", payload);
        socket.emit("private_message", payload);
      }
    } else if (room) {
      io.to(room).emit("room_message", payload);
    } else {
      io.emit("message", payload);
    }
  });

  socket.on("typing", ({ to, room }) => {
    const info = socketUser.get(socket.id) || {};
    const typingPayload = { from: info.username };
    if (to) {
      const targetId = users.get(to);
      if (targetId) io.to(targetId).emit("typing", typingPayload);
    } else if (room) {
      socket.to(room).emit("typing", typingPayload);
    } else {
      socket.broadcast.emit("typing", typingPayload);
    }
  });

  socket.on("disconnect", () => {
    const info = socketUser.get(socket.id);
    if (info) {
      // users.delete(info.username);
      socketUser.delete(socket.id);
      io.emit("user_list", Array.from(users.keys()));
      io.emit("system_message", {
        text: `${info.username} disconnected`,
        time: new Date().toISOString(),
      });
    }
    console.log("socket disconnected", socket.id);
  });
});

