import express from "express";

const app = express();

app.get("/:name/:id", (req, res) => res.send(`Dynamic route ahead ${req.params.id} and name is ${req.params.name}`));

export default app;
