import { Server } from "socket.io";
import { server } from "./index.js";
import Users from "./models/userModel.js";
import UserMessages from "./models/userMessages.js";
import Group from "./models/group.js";
import GroupMember from "./models/groupMember.js";

const io = new Server(server, {
  cors: { origin: process.env.frontend_URL, credentials: true },
  maxHttpBufferSize: 1e8,
});

const onlineUsers = new Map(); // email -> socketId

const userListFromDb = async () => {
  const all = await Users.findAll({ attributes: ["name", "email"] });
  return all.map((u) => ({ name: u.name, email: u.email, online: onlineUsers.has(u.email) }));
};

io.on("connection", (socket) => {
  console.log("socket connected:", socket.id);

  socket.on("join", async ({ username, email, room }) => {
    socket.username = username || null;
    socket.email = email || null;
    if (socket.email) onlineUsers.set(socket.email, socket.id);
    if (room) socket.join(room);

    const userList = await userListFromDb();
    io.emit("user_list", userList);
    io.emit("system_message", {
      text: `${socket.username || socket.email || "Someone"} joined${room ? " room " + room : ""}`, // used 'someone' just so it doesnot break
      time: new Date().toISOString(),
    });
  });

  socket.on("join_group", async ({ username, groupId }) => {
    socket.join(`group_${groupId}`);
    io.to(`group_${groupId}`).emit("system_message", {
      text: `${username || socket.username || socket.email} joined group ${groupId}`,
      time: new Date().toISOString(),
    });
  });

  socket.on("send_message", async ({ to, room, groupId, content }) => {
    const fromEmail = socket.email || null;
    const fromName = socket.username || null;
    const payload = {
      from: fromEmail,
      fromName,
      to: to || null,
      room: room || null,
      groupId: groupId || null,
      content,
      time: new Date().toISOString(),
    };

    try {
      await UserMessages.create({
        from: payload.from,
        to: payload.to,
        room: payload.room,
        groupId: payload.groupId,
        content: payload.content,
        time: payload.time,
      });
    } catch (err) {
      console.error("saving message failed", err);
    }

    if (to) {
      const targetSocketId = onlineUsers.get(to);
      if (targetSocketId) {
        io.to(targetSocketId).emit("private_message", payload);
        socket.emit("private_message", payload);
      } else {
        socket.emit("private_message", payload);
      }
    } else if (room) {
      io.to(room).emit("room_message", payload);
    } else if (groupId) {
      io.to(`group_${groupId}`).emit("room_message", payload);
    } else {
      io.emit("message", payload);
    }
  });

  socket.on("typing", ({ to, room, groupId }) => {
    const fromName = socket.username || socket.email || "Someone";
    const typingPayload = { from: fromName };

    if (to) {
      const targetSocketId = onlineUsers.get(to);
      if (targetSocketId) io.to(targetSocketId).emit("typing", typingPayload);
    } else if (room) {
      socket.to(room).emit("typing", typingPayload);
    } else if (groupId) {
      socket.to(`group_${groupId}`).emit("typing", typingPayload);
    } else {
      socket.broadcast.emit("typing", typingPayload);
    }
  });

  socket.on("disconnect", async () => {
    const email = socket.email;
    if (email && onlineUsers.has(email)) {
      onlineUsers.delete(email);
      const userList = await userListFromDb();
      io.emit("user_list", userList);
      io.emit("system_message", {
        text: `${socket.username || email} disconnected`,
        time: new Date().toISOString(),
      });
    }
    console.log("socket disconnected:", socket.id);
  });
});

export default io;
