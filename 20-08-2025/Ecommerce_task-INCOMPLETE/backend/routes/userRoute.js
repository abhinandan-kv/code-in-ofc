import { Router } from "express";
import { changePasswordAfterLogin, deactivateAccount, forgotPassword, handleEmailToken, login, signUp, twoFactorAuth, twoFALogin, twoFaOtpverification, userAddItemToCard, userListAllProduct, userRemoveItemToCard, userShowFullCart, userSingleOrderPlaced, verifyExample } from "../controllers/userController.js";
import verifyToken from "../middlewares/verifyToken.js";

const userRouter = Router()

// give DOB format details in frontend or handle through date function auto...
// do mention role if you want to have role other than user
userRouter.post('/signup', signUp)

userRouter.post('/login', login)
userRouter.get('/login/verifyotp', verifyToken, twoFALogin)

userRouter.patch('/changepassword', changePasswordAfterLogin)

userRouter.get('/verifyx', verifyToken, verifyExample) //test route only

userRouter.get('/forgotpassword', forgotPassword)

// userRouter.get('/re', (req,res)=>{res.redirect('http://localhost:9000/user/re/redirection')})
// userRouter.get('/re/redirection', (req,res)=>{res.send('working fine!!!!')})

userRouter.post('/changepasswordthroughtoken/:token', verifyToken, handleEmailToken)

//to enable 2fa
userRouter.post('/twofa', verifyToken, twoFactorAuth)
userRouter.get('/twofa/verifyotp',verifyToken, twoFaOtpverification)

userRouter.patch('/deactivate', verifyToken, deactivateAccount)


//user product routes
userRouter.get('/listallproduct', verifyToken, userListAllProduct)
userRouter.post('/additemtocart/:id', verifyToken, userAddItemToCard)
userRouter.delete('/removeitemfromcart/:id', verifyToken, userRemoveItemToCard)
userRouter.get('/showcart', verifyToken, userShowFullCart)
userRouter.post('/singleorder/:id/:quantity', verifyToken, userSingleOrderPlaced)



export default userRouter