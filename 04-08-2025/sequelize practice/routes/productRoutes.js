import sequelize from "../config/database.js";
import { assoTest, newProduct, productsWithUsers } from "../controllers/productControllers.js";
import proRouter from "./userRoutes.js";


proRouter.post('/postpro', newProduct)
proRouter.get('/getall', assoTest)
proRouter.get("/a", productsWithUsers)


export default proRouter