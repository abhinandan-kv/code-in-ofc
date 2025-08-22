import { Router } from "express";
import {
  changePasswordAfterLogin,
  deactivateAccount,
  forgotPassword,
  getFilteredAndSortedProducts,
  handleEmailToken,
  login,
  signUp,
  twoFactorAuth,
  twoFALogin,
  twoFaOtpverification,
  userAddItemToCard,
  userListAllProduct,
  userListProduct,
  userRemoveItemToCard,
  userShowFullCart,
  userSingleOrderPlaced,
  userWholeCartOrder,
  verifyExample,
} from "../controllers/userController.js";
import verifyToken from "../middlewares/verifyToken.js";

const userRouter = Router();

// give DOB format details in frontend or handle through date function auto...
// do mention role if you want to have role other than user
userRouter.post("/signup", signUp);

userRouter.post("/login", login);
userRouter.post("/login/verifyotp", verifyToken, twoFALogin);

userRouter.patch("/changepassword", verifyToken, changePasswordAfterLogin);

userRouter.get("/verifyx", verifyToken, verifyExample); //test route only

userRouter.get("/forgotpassword", forgotPassword);

// userRouter.get('/re', (req,res)=>{res.redirect('http://localhost:9000/user/re/redirection')})
// userRouter.get('/re/redirection', (req,res)=>{res.send('working fine!!!!')})

userRouter.post("/changepasswordthroughtoken/:token", verifyToken, handleEmailToken);

//to enable 2fa
userRouter.post("/twofa", verifyToken, twoFactorAuth);
userRouter.post("/twofa/verifyotp", verifyToken, twoFaOtpverification);

userRouter.patch("/deactivate", verifyToken, deactivateAccount);

//user product routes
userRouter.get("/listallproduct", verifyToken, userListAllProduct);
userRouter.get('/listproduct/:id', verifyToken, userListProduct)

userRouter.post("/additemtocart/:id", verifyToken, userAddItemToCard);
userRouter.delete("/removeitemfromcart/:id", verifyToken, userRemoveItemToCard);
userRouter.get("/showcart", verifyToken, userShowFullCart);

userRouter.post("/singleorder/:id/:quantity", verifyToken, userSingleOrderPlaced);

userRouter.post("/completeorder", verifyToken, userWholeCartOrder);

//userfilters sort
userRouter.get("/product", verifyToken, getFilteredAndSortedProducts);

export default userRouter;
