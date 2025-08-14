import express from "express";
import userRouter from "./Routes/UserRoutes.js";
import sequelize from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = 9000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", methods: ["post", "get"], allowedHeaders: ["Content-Type", "Authorization"] }));

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

try {
  await sequelize.sync();
  console.log("Sequlize synced successfully");
} catch (err) {
  console.error(err);
}
