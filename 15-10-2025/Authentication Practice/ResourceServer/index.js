import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import productRoute from "./router/productRoutes.js";
import cookieParser from "cookie-parser";

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

app.get("/check", (_, res) => res.send("GOT IT"));
app.use("/auth/api/prod", productRoute);

try {
  await sequelize.sync();
  console.log("Sequelize Model synced");
} catch (err) {
  console.error(err);
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
