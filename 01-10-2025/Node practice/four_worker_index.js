import express from "express";
import { Worker } from "worker_threads";

const app = express();
const PORT = 3000;
const THREAD_COUNT = 4;

app.get("/non_blocking", (req, res) => {
  res.status(200).send("This page is non-blocking");
});

function createWorker() {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./four_worker.js", {
      workerData: { threadCount: THREAD_COUNT },
    });
    worker.on("message", (data) => {
      resolve(data);
    });

    worker.on("error", (error) => {
      reject(error);
    });
  });
}

app.get("/blocking", async (req, res) => {
  const workerPromises = [];

  for (let i = 0; i < THREAD_COUNT; i++) {
    workerPromises.push(createWorker());
  }

  const threadResult = await Promise.all(workerPromises);

  let total;

  //   for (let i = 0; i < threadResult.length; i++) {
  //     total += threadResult[i];
  //   }
  total = threadResult[0] + threadResult[1] + threadResult[2] + threadResult[3];

  res.status(200).send(`Counter :${total}`);
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
