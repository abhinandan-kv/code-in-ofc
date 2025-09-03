import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/userRouter.js";
import adminRouter from "./Routes/adminRouter.js";
import sequelize from "./config/database.js";
import authRouter from "./Routes/AuthRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());

// app.get('/',(_,res)=>res.send("Server running"))

app.use('/auth', authRouter)

app.use("/user", userRouter);

app.use("/admin", adminRouter);

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

try {
  await sequelize.sync();
  console.log("All models synced");
} catch (err) {
  console.error(err);
}

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT} AT http://localhost:${PORT}`);
});
