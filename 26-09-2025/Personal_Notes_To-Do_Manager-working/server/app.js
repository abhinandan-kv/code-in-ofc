import express from "express";
import dotenv from "dotenv";
import { userTable, TodoTable } from "./models/associationIndex.js";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import sequelize from "./config/databaseConfig.js";
import userRouter from "./routes/userRouter.js";
import todoRouter from "./routes/todoRouter.js";
import noteRouter from "./routes/noteRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const frontendURL = process.env.frontendURL;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

//test
app.get("/", (_, res) => res.send("yoo"));

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/todo", todoRouter);
app.use("/api/v1/note", noteRouter);

try {
  await sequelize.sync();
  console.log("All models synced");
} catch (err) {
  console.error(err);
}

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON localhost:${PORT}`);
});
