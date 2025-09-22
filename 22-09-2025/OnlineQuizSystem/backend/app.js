import express from "express";
import sequelize from "./Config/dbConfig.js";
import dotenv from "dotenv";
import AuthRouter from "./Routes/authRoute.js";
import bodyParser from "body-parser";
import cors from 'cors'
import QuestionRouter from "./Routes/questionRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const frontendURL = process.env.frontendURL;

app.use(
  cors({
    origin: [frontendURL],
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser())

//test
app.get("/", (_, res) => res.send("yoo"));

app.use("/api/v1/auth", AuthRouter);

app.use("/api/v1/ques", QuestionRouter)

try {
  await sequelize.sync();
  console.log("All models synced");
} catch (err) {
  console.error(err);
}

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON localhost:${PORT}`);
});
