import { Op } from "sequelize";
import product from "../model/productModel.js";
import User from "../model/userModel.js";

async function newProduct(req, res) {
  const { name, price } = req.body;

  try {
    const result = await product.create({ productName: name, price: price });
    console.log(result);
    res.json(result);
  } catch (err) {
    console.error(err);
  }
}

// async function assoTest(req, res) {
//   const result = await product.findAll({
//     attribute: ["name", "productName"],
//     include: [{ model: User, as: "users", attribute: ["id", "name"] }],
//   });
//   console.log(result);

//   res.json(result);
// }

async function productsWithUsers() {
  syncModels();
  await product.findAll({
    include: [{ model: User, as: "user" }],
  });
  console.log("productsWithUsers", productsWithUsers);
}

async function assoTest(req, res) {
  return product.findOne({ where: { name: "tv X" } }).then((data) => {
    console.log(data);
  });
}

export { newProduct, assoTest, productsWithUsers };
