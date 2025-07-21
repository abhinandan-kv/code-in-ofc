import db from "../database/db.js";
import express from "express";

const app = express();

app.get("/list-todos", (req, res) => {
    res.send(db)
    console.log(db)
});

export default app;
