import mysql from "mysql2";

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb3",
};

const connection = mysql.createConnection(dbConfig);

try {
  connection.connect(() => {
    console.log("Connected to the database successfully");

    return connection;
  });
} catch (err) {
  console.error("Error connecting to the databse", err);
}

export default connection;
