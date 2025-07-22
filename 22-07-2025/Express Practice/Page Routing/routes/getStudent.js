import express from "express";

const app = express();
app.use(express.json());

const router = express.Router();

// let student = [
//   {
//     studentId: "S001",
//     firstName: "Alice",
//     lastName: "Smith",
//     age: 20,
//     major: "Computer Science",
//     gpa: 3.8,
//     enrollmentDate: "2023-09-01",
//   },
//   {
//     studentId: "S002",
//     firstName: "Bob",
//     lastName: "Johnson",
//     age: 21,
//     major: "Mechanical Engineering",
//     gpa: 3.2,
//     enrollmentDate: "2022-09-01",
//   },
//   {
//     studentId: "S003",
//     firstName: "Charlie",
//     lastName: "Brown",
//     age: 19,
//     major: "Biology",
//     gpa: 3.9,
//     enrollmentDate: "2024-09-01",
//   },
//   {
//     studentId: "S004",
//     firstName: "Diana",
//     lastName: "Prince",
//     age: 22,
//     major: "Fine Arts",
//     gpa: 3.5,
//     enrollmentDate: "2021-09-01",
//   },
//   {
//     studentId: "S005",
//     firstName: "Ethan",
//     lastName: "Hunt",
//     age: 20,
//     major: "Mathematics",
//     gpa: 3.7,
//     enrollmentDate: "2023-09-01",
//   },
// ];
let student = ["abhi", "raj", "john"];

// let student = [1,2,3,4]



router.get("/", (req, res) => {
  res.send({ data: student });
});

router.get("/:id", (req, res) => {
  res.send({ data: student[req.params.id] });
});

router.post("/addStudent", (req, res) => {
  let studentData = req.body;
  console.log("Request body:", studentData);
  student.push(studentData);

  //console.log(student);
  console.log(studentData);
  res.send("data have been successfully updated");
});

export default router;
