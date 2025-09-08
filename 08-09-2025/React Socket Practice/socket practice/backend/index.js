import express from "express";
import http from "http";
import { Server } from "socket.io";

const PORT = 9000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const connections = new Set();

io.on("connection", (socket) => {
  console.log(`New user connected --> ${socket.id} `);
  connections.add(socket);

  //   socket.on("Send_Message", (data) => {
  //     console.log(data)
  //     socket.broadcast.emit("receive_message", data);
  //   });

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.once("disconnect", () => {
    connections.delete(socket);
  });

  //   socket.emit("connection", null);
});

app.get("/", (_, res) => {
  res.send("Working fine i guess");
});

server.listen(PORT, () => console.log(`Server running on ${PORT}`));
