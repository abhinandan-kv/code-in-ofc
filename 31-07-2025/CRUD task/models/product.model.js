import connection from "../config/database.js";

const Schema =
  "CREATE TABLE IF NOT EXISTS newproducts ( product_id INT PRIMARY KEY AUTO_INCREMENT, product_name VARCHAR(100) NOT NULL, price DECIMAL(10, 2) NOT NULL, user_id INT, FOREIGN KEY (user_id) REFERENCES newusertable(user_id))";

function productTableCreate() {
  connection.query(Schema, (err, result, fields) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result, fields);
      console.log("table created successfully");
    }
  });
}
export default productTableCreate;
