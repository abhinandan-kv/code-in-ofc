import connection from "../config/database.js";
import productTableCreate from "../models/product.model.js";
import query from "../utils/query.js";

//product table schema
// CREATE TABLE products (
//         product_id INT PRIMARY KEY AUTO_INCREMENT,
//         product_name VARCHAR(100) NOT NULL,
//         price DECIMAL(10, 2) NOT NULL,
//         user_id INT,
//         FOREIGN KEY (user_id) REFERENCES newusertable(user_id)
//     );

productTableCreate(); //comment it out after first run

const listProduct = (_, res) => {
  connection.query(query.listAllProduct, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    }
    res.json(result);
  });
};

const buyProduct = (req, res) => {
  let productIds = req.body.product;
  let userId = req.params.id;

  //console.log(query.putProductToUser, userId)

  connection.query(query.putProductToUser, [productIds, userId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    }
    res.json(result);
  });
};

const listProductUser = (req, res) => {
  let userId = req.params.id;

  //connection.query()
};

export { listProduct, buyProduct, listProductUser };
