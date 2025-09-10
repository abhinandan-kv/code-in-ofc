import express from "express";
import {createServer} from "http";
import { Server } from "socket.io";

const app = express();
const PORT = 3000;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let users = new Map() // socketid-> username
let socketUser = new Map() 

io.on("connection", (socket) => {
  console.log("connected - ", socket.id);
//   console.log(socket)

    socket.on('join', ({username, room})=>{

    })

  socket.on('send_message', (msg)=>{
    console.log('message- ', msg)
  })

});

server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON ${PORT}`);
});
