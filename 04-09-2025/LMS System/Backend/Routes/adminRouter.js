import { Router } from "express";
import {
  addNewBook,
  addNewUser,
  allUserIssuedBooks,
  bookReturned,
  deleteBookById,
  deleteUserById,
  historyUserIssuedBooks,
  listBookById,
  listbooks,
  listUsers,
  updateBook,
  updateUsers,
  verify,
} from "../Controllers/adminController.js";
import verifyToken from "../middlewares/verifyToken.js";

const adminRouter = Router();

//test route
adminRouter.get("/test", verifyToken, verify);


// books ops
adminRouter.get("/listbook", verifyToken, listbooks); //force-fully

adminRouter.post("/addbook", verifyToken, addNewBook);

adminRouter.post("/listone", verifyToken, listBookById);

adminRouter.patch("/updatebook/:id", verifyToken, updateBook);

adminRouter.delete("/delete/:id", verifyToken, deleteBookById);


//users ops
adminRouter.get("/listusers", verifyToken, listUsers);

adminRouter.patch("/updateuser", verifyToken, updateUsers);

adminRouter.delete("/delete/user/:id", verifyToken, deleteUserById);

adminRouter.post("/adduser", verifyToken, addNewUser);


// user-book ops
adminRouter.get('/issued/books', verifyToken, allUserIssuedBooks)

adminRouter.get('/issued/book/history', verifyToken, historyUserIssuedBooks)

adminRouter.patch('/book/return/:id', verifyToken, bookReturned)

export default adminRouter;
