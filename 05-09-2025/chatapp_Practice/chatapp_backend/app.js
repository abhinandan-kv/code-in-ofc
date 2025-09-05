import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
import { userConnected } from "./appFunctions.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8999;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

const STATIC_CHANNELS = ["global_notifications", "global_chat"];

io.on("connection", (socket) => {
  console.log("New User Connected", socket.id);
  socket.emit("connection", null);
});

app.get("/", (_, res) => {
  res.send("THIS IS THE BEST CHATAPP");
});

app.get("/chat", userConnected);

// io.on("connection", (socket) => {
//   console.log("User connected");
//   console.log(socket);
// });

server.listen(PORT, () => {
  console.log(`SERVER RUNNING AT localhost:${PORT}`);
});
