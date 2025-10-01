import express from "express";
import { Worker } from "worker_threads";

const app = express();
const PORT = 3000;

app.get("/non_blocking", (req, res) => {
  res.status(200).send("This page is non-blocking");
});

app.get("/blocking",async (req, res) => {
  const worker = new Worker("./worker.js");

  worker.on("message", (data) => {
    console.log(data)
    res.status(200).send(`Counter: ${data}`);
  });

  worker.on("error", (error) => {
    res.status(500).send(error);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
