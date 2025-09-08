import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);

app.use(cors());

const io = new Server(server, {
  // cors: {
  //   origin: "http://localhost:5173",
  // },
});

app.get("/", (req, res) => res.send("Server is Running"));

io.on("connection", (socket) => {
  console.log(`New user conencted ${socket.id}`);
  //   socket.emit("connection", null);

  //   socket.on("message", (msg) => {
  //     console.log("Received message:", msg);
  //   });
  //   socket.on("disconnect", () => {
  //     console.log("A user disconnected");
  //   });
});
const PORT = 9000;

server.listen(
  (PORT,
  () => {
    console.log(`Server running on ${PORT}`);
  })
);
