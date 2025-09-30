import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { checkFileExists, disconnect, uploadChunk, uploadComplete } from "./socket.js";

const app = express();
export const http = createServer(app);

export const io = new Server(http, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

const onConnection = (socket) => {
  console.log("A user connected", socket.id);

  socket.on("check_file_exists", checkFileExists);
  socket.on("upload_chunk", uploadChunk);
  socket.on("upload_complete", uploadComplete);
  socket.on("disconnect", disconnect);
};

io.on("connection", onConnection);

http.listen(3000, () => {
  console.log("Server listening on port 3000");
});
