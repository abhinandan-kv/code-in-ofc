import express from "express";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import db from "./model/index.js";

const app = express();
const PORT = 3002;

app.use(express.json());

app.use("/users", userRoutes);
app.use("/products", productRoutes);

try {
  await db.sequelize.sync(); 
  console.log("Database synced.");
} catch (err) {
  console.error("DB sync error:", err);
}

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON ${PORT}`);
});
