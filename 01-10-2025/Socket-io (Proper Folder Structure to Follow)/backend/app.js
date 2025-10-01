import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { nameHandler } from "./Listeners/nameHandler.js";
import cors from "cors";

const app = express();
const server = createServer();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credential: true,
  })
);

const io = new Server(server);

const onConnection = (socket) => {
  console.log("A New User Connected",socket.id);
  nameHandler(io, socket);
};

io.on("connection", onConnection);

server.listen(3000, () => {
  console.log(`server listening at 3000`);
});
