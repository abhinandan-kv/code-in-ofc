import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { randomUUID } from "crypto";

// add .env later
const PORT = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

// add auth later

app.get("/", (req, res) => {
  res.send("Working Fine!");
});

//middleware
// normal without persistent sessionid
// io.use((socket, next) => {
//   const username = socket.handshake.auth.username;
//   if (!username) {
//     return next(new Error("invalid username"));
//   }
//   socket.username = username;
//   next();
// });


// let sessionStore = {}
// sessionStore.session = new Map()
// sessionStore.findSession(id) = 

// function sessionStore(){
//     return {
//     }
// }



// with persistent sessionid
io.use((socket, next) => {
  const sessionID = socket.handshake.auth.sessionID;
  if (sessionID) {
    const session = sessionStore.findSession(sessionID);        // yet to define this part

    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.username = session.username;
      return next();
    }
  }

  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }

  socket.sessionID = randomUUID();
  socket.userID = randomUUID();
  socket.username = username;
  next();
});

io.on("connection", (socket) => {
  console.log("User Connected");
  socket.join(socket.userID);

  const users = [];

  //sending session details back to user
  socket.emit("session", {
    sessionID: socket.sessionID,
    userId: socket.userID,
  });

  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }

  socket.emit("users", users);

  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
  });

  socket.on("message", (message) => {
    console.log("message:-", message);
  });

  //pvt msg
  socket.on("private message", ({ input, to }) => {
    socket.to(to).to(socket.userID).emit("private message", {
      input,
      from: socket.userID,
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.onAny((event, ...args) => {
    console.log(event, args);
  });
});

server.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});
