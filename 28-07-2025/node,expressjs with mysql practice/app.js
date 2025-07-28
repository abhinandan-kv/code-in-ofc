import express from "express";
import dbRoutes from "./routes/databaseRoutes.js"

const app = express();
const PORT = 3000;

app.use(express.json())

app.use("/db", dbRoutes)


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
