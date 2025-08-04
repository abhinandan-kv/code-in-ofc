import express from "express";
import sequelize from "./config/database.js";
import userRouter from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import path from 'path'

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.use("/uploads", express.static("uploads"));

await sequelize.sync();
console.log("All models were synchronized successfully.");

app.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});
