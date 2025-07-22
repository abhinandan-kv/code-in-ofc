import express from "express";
import bodyParser from "body-parser";

import getRoute from "./routes/getRoute.js";
import postRoute from "./routes/postRoute.js";
import getStudent from "./routes/getStudent.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/get", getRoute);
app.use("/post", postRoute);
app.use("/getStudent", getStudent);

let student = [1, 2, 3, 4];

// app.post("/addStudent", (req, res) => {
//   let {body} = req;
// //   console.log("Request body:", body);
//   student.push(...body);
//   //console.log(student);
//   //console.log(studentData)
//    res.send(student);

// });

app.listen(PORT, () => console.log(`server is running on ${PORT}`));
