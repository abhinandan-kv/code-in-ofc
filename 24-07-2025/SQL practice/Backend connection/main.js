import express from "express";
import dbConnection from "./db.js";

const app = express();
const PORT = 3000;

app.get("/person", (req, res) => {
  dbConnection.query("SELECT * FROM Persons", (error, results, fields) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).send("Error retrieving Persons");
      return;
    }
    res.json(results);

  });
//   const sql1 =
//     "CREATE TABLE geeksforgeeks " + "(id INT AUTO_INCREMENT PRIMARY KEY," + " name VARCHAR(255), address VARCHAR(255))";

//   let fresult;
//   dbConnection.query(sql1, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//     console.log(result);
//     fresult = result;
//   });

//   res.send(fresult);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
