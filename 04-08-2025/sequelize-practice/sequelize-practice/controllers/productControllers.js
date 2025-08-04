import db from "../model/index.js";
const { Product, User } = db;

export const newProduct = async (req, res) => {
  const { name, price, userId } = req.body;

  try {
    const product = await Product.create({ productName: name, price, userId });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Product creation failed" });
  }
};

export const assoTest = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: ["productName", "price"],
      include: [{ model: User, as: "user", attributes: ["id", "name"] }],
    });
    res.json(products);
  } catch (err) {
    console.error("Association fetch error:", err);
    res.status(500).json({ error: "Association fetch failed" });
  }
};

export const productsWithUsers = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: User, as: "user" }],
    });
    res.json(products);
  } catch (err) {
    console.error("Error fetching products with users:", err);
    res.status(500).json({ error: "Fetch failed" });
  }
};
