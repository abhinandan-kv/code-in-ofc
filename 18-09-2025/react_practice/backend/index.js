import express from "express";
import dotenv from "dotenv";
import sequelize from "./Config/database.js";
import userRouter from "./Routes/UserRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json())

app.get("/", (req, res) => res.send("hiiii, its working"));
app.use("/user", userRouter);

try {
  await sequelize.sync();
  console.log("all model synced");
} catch (err) {
  console.error(err);
}

app.listen(PORT, () => {
  console.log(`SERVER RUNNING AT ${PORT}`);
});
