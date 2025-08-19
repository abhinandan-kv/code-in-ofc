import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import cookieParser from "cookie-parser";
import userRouter from './routes/userRoute.js'
import vendorRouter from "./routes/vendorRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser())

// app.get('/', (_, res)=>{res.send("Hi server is runnning :)")})

app.use('/user', userRouter)

app.use('/vendor', vendorRouter)

try {
  await sequelize.sync();
  console.log("All models synced")
} catch (err) {
  console.error(err);
}

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT} AT http://localhost:${PORT}`);
});
