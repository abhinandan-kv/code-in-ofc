import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import userRouter from "./router/userRoutes.js";
import cookieParser from "cookie-parser";
import chatRouter from "./router/chatRoutes.js";
import { Users, Group, GroupMember, UserMessages } from './models/index.js'


dotenv.config();
const PORT = process.env.port;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.frontend_URL,
    credentials: true,
  })
);

export const server = http.createServer(app);

app.use("/user", userRouter);
app.use('/chat', chatRouter)

try {
  await sequelize.sync();
  console.log("Sequelize Model synced");
} catch (err) {
  console.error(err);
}

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
