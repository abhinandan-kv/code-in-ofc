import express from "express";
import { newProduct, assoTest, productsWithUsers } from "../controllers/productControllers.js";

const router = express.Router();

router.post('/new', newProduct);
router.get('/all', assoTest);
router.get("/assoc", productsWithUsers);

export default router;
