import connection from "../config/database.js";

const Schema =
  "CREATE TABLE IF NOT EXISTS usersdata (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(50) NOT NULL UNIQUE, email VARCHAR(100) NOT NULL UNIQUE, password_hash VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, CONSTRAINT chk_email_format CHECK (email REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'))"

function tableCreate() {
  connection.query(Schema, (err, result, fields) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result, fields);
      console.log("table created successfully");
    }
  });
}
export default tableCreate;
