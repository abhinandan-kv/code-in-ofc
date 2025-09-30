import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import upload from "./Middleware/upload.js";
import { MulterError } from "multer";
import fileRouter from "./routes/fileRouter.js";
import sequelize from "./config/databaseConfig.js";
import AuthRouter from "./routes/authRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const frontendURL = process.env.frontendURL;

app.use(
  cors({
    origin: frontendURL,
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

//test
app.get("/", (_, res) => res.send("yoo"));
app.use("/auth", AuthRouter);
app.use("/file", fileRouter);

// app.use("/api/v1/auth", AuthRouter);

// app.post("/upload_file", upload.single("file"), (req, res) => {
//   if (!req.file) {
//     throw new Error("FILE_MISSING");
//   } else {
//     res.send({ status: "success" });
//   }
// });

// app.use((err, req, res, next) => {
//   if (err instanceof MulterError) {
//     res.statusCode = 400;
//     res.send({ code: err.code });
//   } else if (err) {
//     if (err.message === "FILE_MISSING") {
//       res.statusCode = 400;
//       res.send({ code: "FILE_MISSING" });
//     } else {
//       res.statusCode = 500;
//       res.send({ code: "GENERIC_ERROR", err });
//     }
//   }
// });

app.use("/uploads", express.static("uploads"));

try {
  await sequelize.sync();
  console.log("All models synced");
} catch (err) {
  console.error(err);
}

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON localhost:${PORT}`);
});
