import express from "express";

const router = express.Router();
let someData = {
  message: "Hello from the response model!",
};
router.get("/", (req, res) => {
  res.json(someData);
});

router.put("/", (req, res) => {
  let tempData = req.body;
  someData = { ...someData, ...tempData };
  //console.log(someData)
  res.json(someData);
});

router.patch("/:key", (req, res) => {
  let tempData = req.body;
  let key = req.params.key
  someData[key] = { ...someData, ...tempData };
  console.log(someData);
  res.json(someData);
});



router.get("/send", (req, res) => {
  res.send("This is a response from the response model.");
});

router.get("/status", (req, res) => {
  res.status(404);
  res.send("This is a 404 status response from the response model.");
});

router.get("/redirect", (req, res) => {
  res.redirect("https://www.example.com");
});

router.get("/download", (req, res) => {
  res.download("./uploads/file.txt");
});

router.get("/cookie", (req, res) => {
  res.cookie("user", "John Doe", { maxAge: 900000, httpOnly: true });
  res.send("Cookie has been set");
});

export default router;
