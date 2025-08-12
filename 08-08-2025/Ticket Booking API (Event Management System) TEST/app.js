import express from "express";
import sequelize from "./config/database.js";
import userRouter from "./routes/UserRouter.js";
import eventRouter from "./routes/eventRouter.js";



const app = express();
const PORT = 3000;

app.use(express.json())
app.use('/t', userRouter)
app.use('/event', eventRouter)

try {
  await sequelize.sync()
  console.log("Models synced successfully");
} catch (err) {
  console.error(err);
}

app.listen(PORT, () => {
  console.log(`APP LISTENING ON ${PORT}`);
});
