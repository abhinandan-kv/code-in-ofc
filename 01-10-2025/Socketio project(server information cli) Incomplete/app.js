import { Server } from "socket.io";
import express from "express";
import { createServer } from "http";

const app = express();
const server = createServer();
const io = new Server(server);

server.listen(3000, () => {
  console.log("Server running at 3000");
});
