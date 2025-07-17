const API = "https://api.adviceslip.com/advice";

import express from "express";
import https from "https";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  let data = "";
  res.header("Something");
  https.get(API, (response) => {
    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      try {
        const parsedData = JSON.parse(data);
        //res.json(parsedData);
        console.log(parsedData.slip.advice);

        let adviceId = parsedData.slip.id;
        let advice = parsedData.slip.advice;

        res.send(`${adviceId} : ${advice}`);
        
      } catch {
        console.error(`Error parsing JSON`);
        res.status(500).send("Error parsing data");
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
