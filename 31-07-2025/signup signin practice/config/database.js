import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();

let dbConfig = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
};

let connection = mysql.createConnection(dbConfig);

try {
  connection.connect(() => {
    console.log("Database connected succesfully");
    return connection;
  });
} catch (err) {
  console.error(err);
}

export default connection;
