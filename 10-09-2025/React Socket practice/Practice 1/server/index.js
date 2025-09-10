import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const PORT = 3000;

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.get("/", (_, res) => res.send("Hii!"));

const users = new Map();
const socketUser = new Map();

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("chat_message", (msg) => {
    console.log("message- ", msg);
  });

  socket.on("join", ({ username, room }) => {
    socketUser.set(socket.id, { username, room: room || null });
    users.set(username, socket.id);

    if (room) socket.join(room);

    io.emit("user_list", Array.from(users.keys()));
    io.emit("system_message", {
      text: `${username} joined ${room ? "room" + room : ""}`,
      time: new Date().toISOString(),
    });
  });

  socket.on("send_message", ({ to, room, content }) => {
    const info = socketUser.get(socket.id) || {};

    const payload = {
      from: info.username || info.socket.id,
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

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON ${PORT}`);
});
