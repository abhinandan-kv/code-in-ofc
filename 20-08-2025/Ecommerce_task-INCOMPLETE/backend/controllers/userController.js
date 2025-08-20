import sequelize from "../config/database.js";
import UserTable from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import tempUserTable from "../models/tempUserOTPModel.js";
import sendEmail from "../utils/sendEmail.js";
import VendorProduct from "../models/vendorProduct.js";
import UserProductCart from "../models/userProductCartModel.js";
import UserVendorOrder from "../models/userVendorOrderModel.js";

const SALT_ROUNDS = 10; //this will degrades performance(or you can say takes more time to encypt) as you increase this 10 is good enough

export async function signUp(req, res) {
  const { name, email, phoneNumber, password, dob, role } = req.body;

  try {
    if (!name || !email || !phoneNumber || !password || !dob) {
      res.status(400).send("Values cant be empty");
    }
    console.log("DATA", name, email, phoneNumber.length, password, dob, role);

    // if (phoneNumber.length < 8 || phoneNumber > 10) {
    //   res.status(416).send("Phone number should be atleast 8 digits and max 10 digits");
    // }        //this is hidden becz handled through model validation

    if (role == "admin") {
      const emailExists = await UserTable.findOne({ where: { email: email } });

      if (emailExists) {
        res.status(400).send("User already exists, Kindly Login!");
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      const userCreation = await UserTable.create({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        password: hashedPassword,
        dob: dob,
        role: role,
        isActive: true,
      });

      res.status(200).json({ message: "User Created Successfully", response: userCreation.toJSON() });
    } else {
      const emailExists = await UserTable.findOne({ where: { email: email } });

      if (emailExists) {
        res.status(400).send("User already exists, Kindly Login!");
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      const userCreation = await UserTable.create({ name: name, email: email, phoneNumber: phoneNumber, password: hashedPassword, dob: dob });

      res.status(200).json({ message: "User Created Successfully", response: userCreation.toJSON() });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send("Values cant be empty");
  }

  try {
    const userDetail = await UserTable.findOne({ where: { email: email } });

    if (!userDetail) {
      res.status(404).send("User Not Found, Please signIn");
    }

    const comparePassword = await bcrypt.compare(password, userDetail.password);

    if (!comparePassword) {
      res.status(401).send("Password does not match");
    }

    if (!userDetail.isActive) {
      res.status(401).send("Your account is not activated yet wait for some time :)");
    }

    const tokenGen = jwt.sign(
      { id: userDetail.id, name: userDetail.name, role: userDetail.role, email: userDetail.email, phoneNumber: userDetail.phoneNumber },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    if (userDetail.is2Fa == "true") {
      const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);

      const saveOTPInDB = await tempUserTable.create({ userId: id, otp: randomSixDigitNumber });

      const to = email;
      const subject = "Two-factor authentication OTP";
      const text = "verify the otp";
      const html = `<h1>Welcome to bestEcommerce</h1><p>Use the OTP below as part of 2FA to login</p><span>${randomSixDigitNumber}</span>`;
      sendEmail(to, subject, text, html);

      const tokenGen = jwt.sign(
        { id: userDetail.id, name: userDetail.name, role: userDetail.role, email: userDetail.email, phoneNumber: userDetail.phoneNumber },
        process.env.JWT_KEY,
        { expiresIn: "10m" }
      );
      res.cookie("token", tokenGen, { maxAge: 600000, httpOnly: true }); //10mins same as jwt expires time

      res.redirect(`${process.env.BACKEND_URL}/users/login/verifyotp`);
    } else {
      res.cookie("token", tokenGen, { maxAge: 3600000, httpOnly: true }); //1hour same as jwt expires time
      res.status(200).json({ message: "Login Successfully", token: { tokenGen } });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function twoFALogin(req, res) {
  const { otp } = req.body;
  const { id } = req.user;

  try {
    const gettingOtpData = await tempUserTable.findOne({ where: { userId: id } });

    const otpFromUser = parseInt(otp);
    const otpFromDB = gettingOtpData.otp;
    const otpCreatedAtTime = gettingOtpData.createdAt;
    const dateObject = new Date(otpCreatedAtTime);
    const otpCreatedAtTimeInMS = dateObject.getTime();

    const otpExpirationTimeInMS = otpCreatedAtTimeInMS + 10000;

    const currentTime = new Date();
    const currentTimeInMS = currentTime.getTime();

    if (otpExpirationTimeInMS - currentTimeInMS < 0) {
      res.status(403).send("OTP expired");
    }

    if (otpFromUser != otpFromDB) {
      res.status(403).send("Wrong OTP");
    }

    const getUserDeatilsForTokenGen = await UserTable.findByPk(id);

    const tokenGen = jwt.sign(
      {
        id: getUserDeatilsForTokenGen.id,
        name: getUserDeatilsForTokenGen.name,
        role: getUserDeatilsForTokenGen.role,
        email: getUserDeatilsForTokenGen.email,
        phoneNumber: getUserDeatilsForTokenGen.phoneNumber,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    const removeOTPfromTempDB = await tempUserTable.destroy({ userId: id });

    res.cookie("token", tokenGen, { maxAge: new Date(Date.now() + 3600000), httpOnly: true }); //1hour same as jwt expires time

    res.status(200).json({ message: "Login Successfully", removedOTP: removeOTPfromTempDB });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function changePasswordAfterLogin(req, res) {
  const { id, email } = req.user;
  const { password } = req.body;

  try {
    const newPasswordHashed = await bcrypt.hash(password, SALT_ROUNDS);

    const result = await UserTable.update({ password: newPasswordHashed }, { where: { id: id } });

    const userDetail = await UserTable.findByPk(id);

    res.status(200).json({ message: "Password updated successfully", updatedData: userDetail });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

// async function sendEmail(token) {
//   const transporter = nodemailer.createTransport({
//     host: "live.smtp.mailtrap.io",
//     port: 587,
//     secure: false,
//     auth: {
//       user: process.env.MAILTRAP_USER,
//       pass: process.env.MAILTRAP_API_KEY,
//     },
//     tls: {
//       rejectUnauthorized: false,
//     },
//   });

//   const mailOptions = {
//     from: "yourusername@demomailtrap.co",
//     to: "layim13767@baxidy.com",
//     subject: "Sending Email using Node.js",
//     text: `That was easy!`,
//     html: `<h1>Welcome To bestEcommerce</h1><p>Click on the link below to reset password</p> <a>${token}</a>`, //change the ${token} link with actual frontend link
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log("ERROR", error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });
// }

export async function forgotPassword(req, res) {
  const { email, password } = req.body;

  try {
    // const tempToken = crypto.getRandomValues //handling now

    if (!email || !password) {
      res.status(400).send("Values cant be empty");
    }

    const isUserExists = await UserTable.findOne({ where: { email: email } });

    if (!isUserExists) {
      res.status(404).send("User does not exist, signup first.");
    }

    const comparePassword = await bcrypt.compare(password, isUserExists.password);

    if (!comparePassword) {
      res.status(403).send("Incorrect Credentials, check email or password");
    }

    const tempToken = jwt.sign({ id: isUserExists.id, email: isUserExists.email }, process.env.JWT_KEY, { expiresIn: "10m" });
    // console.log("token", tempToken)

    const to = email;
    const subject = "Reset password for your bestEcommerce account";
    const text = `Reset Password using this link ${tempToken}`;
    const html = `<h1>Welcome to bestEcommerce</h1><p>Click on the link below to reset password</p><a>${tempToken}</a>`;
    sendEmail(to, subject, text, html);

    //after email sending another route will handle the rest
    res.status(200).send("Email Sent");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function handleEmailToken(req, res) {
  const { id, email } = req.user;
  const { password } = req.body; //newpassword from user
  try {
    if (!password) {
      res.status(400).send("Field cant be empty");
    }

    const newPasswordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const setNewPW = await UserTable.update({ password: newPasswordHash }, { where: { id: id } });

    // const result = await UserTable.findByPk(id); // can show updated data if required

    res.status(200).json({ message: "Updated Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function twoFactorAuth(req, res) {
  const { id, email } = req.user;
  try {
    const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);
    // console.log(randomSixDigitNumber);

    const saveOTPInDB = await tempUserTable.create({ userId: id, otp: randomSixDigitNumber });

    const to = email;
    const subject = "Activate two-factor authentication";
    const text = "verify the otp";
    const html = `<h1>Welcome to bestEcommerce</h1><p>Use the OTP below to activate 2FA</p><span>${randomSixDigitNumber}</span>`;
    sendEmail(to, subject, text, html);

    res.status(200).redirect(`${process.env.BACKEND_URL}/users/twofa/verifyotp`);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function twoFaOtpverification(req, res) {
  const { otp } = req.body;
  const { id, email } = req.user;

  try {
    const gettingOTPDetails = await tempUserTable.findOne({ where: { userId: id } });
    const otpFromUser = parseInt(otp);
    const otpFromDB = gettingOTPDetails.otp;

    const otpCreatedAtTime = gettingOTPDetails.createdAt;
    const dateObject = new Date(otpCreatedAtTime);
    const otpCreatedAtTimeInMS = dateObject.getTime();

    const otpExpirationTimeInMS = otpCreatedAtTimeInMS + 10000;

    const currentTime = new Date();
    const currentTimeInMS = currentTime.getTime();

    if (otpExpirationTimeInMS - currentTimeInMS < 0) {
      res.status(403).send("OTP expired");
    }

    if (otpFromUser != otpFromDB) {
      res.status(403).send("Incorrect Otp");
    }

    const result = await UserTable.update({ is2Fa: "true" }, { where: { id: id } });
    const removeOTPfromTempDB = await tempUserTable.destroy({ userId: id });

    res.send(200).json({ message: "2FA established successfully", result: result, removedOTP: removeOTPfromTempDB });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function verifyExample(req, res) {
  console.log(req.user);
  res.status(200).send("verifyToken Middleware Working Fine", req.user);
}

export async function deactivateAccount(req, res) {
  const { id, email } = req.user;
  // const {time} = req.body;      //sleep timing can be adjusted by this but user need to ping admin if wants to reactivate account

  try {
    const result = await UserTable.update({ isActive: false }, { where: { id: id } });

    // res.send("Account deactivated Successfully")
    res.clearCookie("token");
    res.redirect(`${process.env.FRONTEND_URL}`); //handle this later to change to frontend url and logged out
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function userListAllProduct(req, res) {
  const { id } = req.user;

  try {
    const allproducts = await VendorProduct.findAll();

    if (!allproducts) {
      res.status(404).send("No Product Found");
    }

    res.status(200).json({ message: "Product List successfully received", allproducts });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function userAddItemToCard(req, res) {
  const { id } = req.user;
  const productIdToAdd = req.params.id;

  try {
    const isProductExists = await VendorProduct.findByPk(productIdToAdd);

    if (!isProductExists) {
      res.status(404).json({ message: "Cant add product, Incorrect Product Id" });
    }

    const addedToCart = await UserProductCart.create({ userId: id, productId: productIdToAdd });

    res.status(200).json({ message: "Product added successfully to Cart", addedToCart });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function userRemoveItemToCard(req, res) {
  const { id } = req.user;
  const productIdToRemove = req.params.id;

  try {
    const isProductExists = await VendorProduct.findByPk(productIdToRemove);

    if (!isProductExists) {
      res.status(404).json({ message: "Cant remove product, incorrect product Id" });
    }

    const removeFromCart = await UserProductCart.destroy({ where: { userId: id, productId: productIdToRemove } });
    const currentItemInCart = await UserProductCart.findAll({ where: { userId: id } });

    res.status(200).json({ message: "Product Removed from Cart Successfully", removedItem: removeFromCart, currentCartItems: currentItemInCart });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function userShowFullCart(req, res) {
  const { id } = req.user;

  try {
    const allItemsFromUserProductCart = await UserProductCart.findAll({ where: { userId: id } });

    // const productsWithEstimationDeliveryTime =await VendorProduct.findByPk() // handle this later this needs to run inside a loop to iterate over all cart products.
    if (!allItemsFromUserProductCart) {
      res.status(404).json({ message: "Your cart is empty." });
    }

    res.status(200).json({ message: "Cart Items successfully retrived", allItemsFromUserProductCart });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function userSingleOrderPlaced(req, res) {
  const { id, qualitity } = req.user;
  const toOrderId = req.params.id;

  try {
    const isProductExists = await VendorProduct.findByPk(toOrderId);

    if (!isProductExists) {
      res.status(404).json({ message: "Product Doesnot Exists" });
    }

    if (isProductExists.vendorProductStock == 0) {
      res.status(404).json({ message: "Sadly Stock Over..." });
    }

    const totalPrice = isProductExists.vendorProductPrice * qualitity;

    const orderPlaced = await UserVendorOrder.create({
      userId: id,
      productId: toOrderId,
      vendorId: isProductExists.vendorId,
      productUUID: isProductExists.vendorProductUUID,
      productQualitity: qualitity,
      productTotalPrice: totalPrice,
      productEstimationTime: isProductExists.vendorAvgDeliveryTime,
    });

    res.status(200).json({ message: "Order Placed Successfully", orderPlaced });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}


export async function userWholeCartOrder(req,res){
  //handling now
}