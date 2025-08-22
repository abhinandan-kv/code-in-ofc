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
import { Op } from "sequelize";
import auditFunctionality from "../utils/auditLogMaker.js";

const SALT_ROUNDS = 10; //this will degrades performance(or you can say takes more time to encypt) as you increase this 10 is good enough

export async function signUp(req, res) {
  const { name, email, phoneNumber, password, dob, role } = req.body;

  try {
    if (!name || !email || !phoneNumber || !password || !dob) {
      return res.status(400).send("Values cant be empty");
    }
    console.log("DATA", name, email, phoneNumber.length, password, dob, role);

    const emailExists = await UserTable.findOne({ where: { email: email } });

    if (emailExists) {
      return res.status(400).send("User already exists, Kindly Login!");
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    if (role == "admin") {
      const userCreation = await UserTable.create({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        password: hashedPassword,
        dob: dob,
        role: role,
        isActive: true,
        approvedBy: "Self Approved",
      });

      return res.status(200).json({
        message: "User Created Successfully",
        response: userCreation.toJSON(),
      });
    } else {
      const userCreation = await UserTable.create({
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        password: hashedPassword,
        dob: dob,
        role: role,
      });

      return res.status(200).json({
        message: "User Created Successfully",
        response: userCreation,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Values cant be empty");
  }

  try {
    const userDetail = await UserTable.findOne({ where: { email: email } });

    if (!userDetail) {
      return res.status(404).send("User Not Found, Please signUp");
    }

    const comparePassword = await bcrypt.compare(password, userDetail.password);

    if (!comparePassword) {
      return res.status(401).send("Password does not match");
    }

    if (!userDetail.isActive) {
      return res.status(401).send("Your account is not activated yet wait for some time :)");
    }

    const tokenGen = jwt.sign(
      {
        id: userDetail.id,
        name: userDetail.name,
        role: userDetail.role,
        email: userDetail.email,
        phoneNumber: userDetail.phoneNumber,
      },
      process.env.JWT_KEY,
      { expiresIn: "12h" }
    );

    if (userDetail.is2Fa == "true") {
      const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);

      const saveOTPInDB = await tempUserTable.create({
        userId: userDetail.id,
        otp: randomSixDigitNumber,
      });

      const to = email;
      const subject = "Two-factor authentication OTP";
      const text = "verify the otp";
      const html = `<h1>Welcome to bestEcommerce</h1><p>Use the OTP below as part of 2FA to login</p><span>${randomSixDigitNumber}</span>`;
      sendEmail(to, subject, text, html);

      const tokenGen2FA = jwt.sign(
        {
          id: userDetail.id,
          name: userDetail.name,
          role: userDetail.role,
          email: userDetail.email,
          phoneNumber: userDetail.phoneNumber,
        },
        process.env.JWT_KEY,
        { expiresIn: "10m" }
      );
      res.cookie("token", tokenGen2FA, { maxAge: 600000, httpOnly: true }); //10mins same as jwt expires time

      res.status(200).json({ message: "2FA email sent" }); //handle to redirect page after successful respnse to different route ie. verify otp page

      //  return res.redirect(
      //     `${process.env.BACKEND_URL}/users/login/verifyotp`
      //  );
    } else {
      res.cookie("token", tokenGen, { maxAge: 3600000, httpOnly: true }); //1hour same as jwt expires time
      return res.status(200).json({ message: "Login Successfully", token: tokenGen, role: userDetail.role });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function twoFALogin(req, res) {
  const { otp } = req.body;
  const { id, name, role, email } = req.user;

  try {
    if (!otp) {
      return res.status(404).send("please provide a OTP");
    }
    const gettingOtpData = await tempUserTable.findOne({
      where: { userId: id },
    });

    if (!gettingOtpData) {
      await tempUserTable.destroy({ where: { userId: id } });
      return res.status(404).send("OTP not found");
    }

    const otpFromUser = parseInt(otp);
    const otpFromDB = gettingOtpData.otp;
    const otpCreatedAtTime = gettingOtpData.createdAt;
    const dateObject = new Date(otpCreatedAtTime);
    const otpCreatedAtTimeInMS = dateObject.getTime();

    const otpExpirationTimeInMS = otpCreatedAtTimeInMS + 10000;

    const currentTime = new Date();
    const currentTimeInMS = currentTime.getTime();

    console.log();
    if (otpExpirationTimeInMS < otpCreatedAtTimeInMS) {
      // console.log("inside compare if")
      await tempUserTable.destroy({ where: { userId: id } });
      return res.status(403).send("OTP expired");
    }

    if (otpFromUser !== otpFromDB) {
      await tempUserTable.destroy({ where: { userId: id } });
      return res.status(403).send("Wrong OTP");
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
      { expiresIn: "12h" }
    );
    await tempUserTable.destroy({ where: { userId: id } });

    auditFunctionality(id, name, role, email, `enabled 2-Factor Authentication having userId:${id}`);

    res.cookie("token", tokenGen, { maxAge: 3600000, httpOnly: true }); //1hour same as jwt expires time

    res.status(200).json({
      message: "Login Successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function changePasswordAfterLogin(req, res) {
  const { id, email, role, name } = req.user;
  const { password } = req.body;

  try {
    const newPasswordHashed = await bcrypt.hash(password, SALT_ROUNDS);

    const result = await UserTable.update({ password: newPasswordHashed }, { where: { id: id } });

    const userDetail = await UserTable.findByPk(id);

    auditFunctionality(id, name, role, email, `changed passoword after login user with id:${id}`);

    res.status(200).json({
      message: "Password updated successfully",
      updatedData: userDetail,
    });
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
    if (!email || !password) {
      return res.status(400).send("Values cant be empty");
    }

    const isUserExists = await UserTable.findOne({ where: { email: email } });

    if (!isUserExists) {
      return res.status(404).send("User does not exist, signup first.");
    }

    const comparePassword = await bcrypt.compare(password, isUserExists.password);

    if (!comparePassword) {
      return res.status(403).send("Incorrect Credentials, check email or password");
    }

    const tempToken = jwt.sign({ id: isUserExists.id, email: isUserExists.email }, process.env.JWT_KEY, { expiresIn: "10m" });

    const to = email;
    const subject = "Reset password for your bestEcommerce account";
    const text = `Reset Password using this link ${tempToken}`;
    const html = `<h1>Welcome to bestEcommerce</h1><p>Click on the link below to reset password</p><a>${tempToken}</a>`;
    sendEmail(to, subject, text, html);

    return res.status(200).send("Email Sent");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function handleEmailToken(req, res) {
  const { id, email, name, role } = req.user;
  const { password } = req.body; //newpassword from user
  try {
    if (!password) {
      return res.status(400).send("Field cant be empty");
    }

    const newPasswordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const [setNewPW] = await UserTable.update({ password: newPasswordHash }, { where: { id: id } });

    if (!setNewPW) {
      return res.status(404).json({ message: "User not found" });
    }
    // const result = await UserTable.findByPk(id); // can show updated data if required

    auditFunctionality(id, name, role, email, `resetted password userId:${id}`);

    res.status(200).json({ message: "Updated Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function twoFactorAuth(req, res) {
  const { id, email, name, role } = req.user;
  try {
    const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);
    // console.log(randomSixDigitNumber);

    await tempUserTable.destroy({ where: { userId: id } });
    await tempUserTable.create({
      userId: id,
      otp: randomSixDigitNumber,
    });

    const to = email;
    const subject = "Activate two-factor authentication";
    const text = "verify the otp";
    const html = `<h1>Welcome to bestEcommerce</h1><p>Use the OTP below to activate 2FA</p><span>${randomSixDigitNumber}</span>`;
    await sendEmail(to, subject, text, html);

    setTimeout(async () => {
      await tempUserTable.destroy({ where: { userId: id } });
    }, 100000);

    auditFunctionality(id, name, role, email, `initiated 2-FA Authentication process having userId:${id}`);

    res.status(200).send({ message: "OTP sent successfully" });
    //.redirect(`${process.env.BACKEND_URL}/users/twofa/verifyotp`);     // redirect this to frontend otp digit verification page
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function twoFaOtpverification(req, res) {
  const { otp } = req.body;
  const { id, name, role, email } = req.user;

  try {
    const gettingOTPDetails = await tempUserTable.findOne({
      where: { userId: id },
    });

    if (!gettingOTPDetails) {
      return res.status(404).send("OTP not found");
    }

    const otpFromUser = parseInt(otp);
    const otpFromDB = gettingOTPDetails.otp;

    const otpCreatedAtTime = gettingOTPDetails.createdAt;
    const dateObject = new Date(otpCreatedAtTime);
    const otpCreatedAtTimeInMS = dateObject.getTime();

    const otpExpirationTimeInMS = otpCreatedAtTimeInMS + 10000;

    console.log(otpCreatedAtTimeInMS);

    console.log(otpExpirationTimeInMS);

    const currentTime = new Date();
    const currentTimeInMS = currentTime.getTime();

    if (otpExpirationTimeInMS < currentTimeInMS) {
      //  console.log("inside if");
      return res.status(403).send("OTP expired");
    }

    if (otpFromUser != otpFromDB) {
      return res.status(403).send("Incorrect Otp");
    }

    const result = await UserTable.update({ is2Fa: "true" }, { where: { id: id } });

    const removeOTPfromTempDB = await tempUserTable.destroy({
      where: { userId: id },
    });

    auditFunctionality(id, name, role, email, `successfullt completed 2-FA Authentication having userId:${id}`);

    res.status(200).json({
      message: "2FA established successfully",
      result: result,
      removedOTP: removeOTPfromTempDB,
    });
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
  const { id, email, name, role } = req.user;
  // const {time} = req.body;      //sleep timing can be adjusted by this but user need to ping admin if wants to reactivate account

  try {
    const result = await UserTable.update({ isActive: false }, { where: { id: id } });

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    auditFunctionality(id, name, role, email, `user deactivated account having userId:${id}`);

    // res.send("Account deactivated Successfully")
    res.clearCookie("token");
    res.status(200).json({ message: "User Deactivated Successfully" });
    // res.redirect(`${process.env.FRONTEND_URL}`); //handle this later to change to frontend url and logged out // handle this from frontend
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function userListAllProduct(req, res) {
  const { id, role, name, email } = req.user;

  try {
    const allproducts = await VendorProduct.findAll();

    if (!allproducts || allproducts.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    auditFunctionality(id, name, role, email, `listed all products`);

    res.status(200).json({
      message: "Product list successfully received",
      products: allproducts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function userListProduct(req, res) {
  const { id, role, name, email } = req.user;
  const productId = req.params.id;

  try {
    const allproducts = await VendorProduct.findByPk(productId);

    if (!allproducts || allproducts.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    auditFunctionality(id, name, role, email, `listed all products`);

    res.status(200).send({
      message: "Product list successfully received",
      products: allproducts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function userAddItemToCard(req, res) {
  const { id, name, email, role } = req.user;
  const productIdToAdd = req.params.id;

  try {
    const isProductExists = await VendorProduct.findByPk(productIdToAdd);

    if (!isProductExists) {
      return res.status(404).json({ message: "Cant add product, Incorrect Product Id" });
    }
    const existingCartItem = await UserProductCart.findOne({
      where: { userId: id, productId: productIdToAdd },
    });

    if (existingCartItem) {
      return res.status(400).json({ message: "Product already exists in your cart" });
    }

    const addedToCart = await UserProductCart.create({
      userId: id,
      productId: productIdToAdd,
    });

    auditFunctionality(id, name, role, email, `user added product to cart productId:${productIdToAdd}`);

    res.status(200).json({
      message: "Product added successfully to Cart",
      addedToCart,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function userRemoveItemToCard(req, res) {
  const { id, name, role, email } = req.user;
  const productIdToRemove = req.params.id;

  try {
    const isProductExists = await UserProductCart.findByPk(productIdToRemove);

    if (!isProductExists) {
      return res.status(404).json({ message: "Cant remove product, incorrect product Id" });
    }

    // const removeFromCart = await UserProductCart.destroy({
    //   where: { [Op.and]: [{ userId: id }, { productId: productIdToRemove }] },
    // });

    const removeFromCart = await UserProductCart.destroy({
      where: { id:productIdToRemove  },
    });

    const currentItemInCart = await UserProductCart.findAll({
      where: { userId: id },
    });

    auditFunctionality(id, name, role, email, `user removed a product from cart productId:${productIdToRemove}`);

    res.status(200).send({
      message: "Product Removed from Cart Successfully",
      removedItem: removeFromCart,
      currentCartItems: currentItemInCart,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function userShowFullCart(req, res) {
  const { id } = req.user;
  //   console.log("id====", id);
  try {
    const cartItems = await UserProductCart.findAll({
      where: { userId: id },
    });
    console.log("allItemsFRomUserProduct - ", cartItems, "length-", cartItems.length);

    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ message: "Your cart is empty." });
    }

    const productIds = cartItems.map((item) => item.productId);

    const products = await VendorProduct.findAll({
      where: { id: productIds },
    });

    const cartWithProducts = cartItems.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        ...item,
        productDetails: product || null,
      };
    });

    res.status(200).json({
      message: "Cart items successfully retrieved",
      cart: cartWithProducts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function userSingleOrderPlaced(req, res) {
  const { id, name, role, email } = req.user;
  const productId = req.params.id;
  const quantity = parseInt(req.params.quantity);

  try {
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const product = await VendorProduct.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product does not exist" });
    }

    if (product.vendorProductStock < quantity) {
      return res.status(400).json({ message: `Only ${product.vendorProductStock} items left in stock` });
    }

    const totalPrice = product.vendorProductPrice * quantity;

    const result = await sequelize.transaction(async (t) => {
      const orderPlaced = await UserVendorOrder.create(
        {
          userId: id,
          productId: productId,
          vendorId: product.vendorId,
          productUUID: product.vendorProductUUID,
          productQuantity: quantity,
          productTotalPrice: totalPrice,
          productEstimationTime: product.vendorAvgDeliveryTime,
        },
        { transaction: t }
      );

      product.vendorProductStock -= quantity;
      await product.save({ transaction: t });

      return orderPlaced;
    });

    auditFunctionality(id, name, role, email, `user placed an order cartUUID:${result.productUUID}`);

    res.status(200).json({
      message: "Order placed successfully",
      order: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function userWholeCartOrder(req, res) {
  // multi vendor notification is still not handled here
  const { id, name, role, email } = req.user;

  try {
    const cartItems = await UserProductCart.findAll({
      where: { userId: id },
    });

    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ message: "Your cart is empty" });
    }

    const result = await sequelize.transaction(async (t) => {
      let orders = [];
      let totalOrderPrice = 0;

      for (const item of cartItems) {
        const product = await VendorProduct.findByPk(item.productId, {
          transaction: t,
        });

        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }

        const quantity = item.quantity ? item.quantity : 1;

        if (product.vendorProductStock < quantity) {
          throw new Error(`Insufficient stock for product ${product.vendorProductName}. Only ${product.vendorProductStock} left`);
        }

        const totalPrice = product.vendorProductPrice * quantity;
        totalOrderPrice += totalPrice;

        const orderPlaced = await UserVendorOrder.create(
          {
            userId: id,
            productId: product.id,
            vendorId: product.vendorId,
            productUUID: product.vendorProductUUID,
            productQuantity: quantity,
            productTotalPrice: totalPrice,
            productEstimationTime: product.vendorAvgDeliveryTime,
          },
          { transaction: t }
        );

        product.vendorProductStock -= quantity;
        await product.save({ transaction: t });

        orders.push(orderPlaced);
      }

      await UserProductCart.destroy({ where: { userId: id }, transaction: t });

      return { orders, totalOrderPrice };
    });

    //  auditFunctionality(id, name, role, email, `user ordered whole cart to cart productId:${result.productUUID}`);

    res.status(200).json({
      message: "Whole cart ordered successfully",
      totalOrderPrice: result.totalOrderPrice,
      orders: result.orders,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

export async function getFilteredAndSortedProducts(req, res) {
  try {
    const { minPrice, maxPrice, category, subCategory, inStock, sortBy, sortOrder = "ASC" } = req.query;

    const where = {};

    if (minPrice && maxPrice) {
      where.vendorProductPrice = { [Op.between]: [minPrice, maxPrice] };
    } else if (minPrice) {
      where.vendorProductPrice = { [Op.gte]: minPrice };
    } else if (maxPrice) {
      where.vendorProductPrice = { [Op.lte]: maxPrice };
    }

    if (category) {
      where.vendorProductCategory = category;
    }

    if (subCategory) {
      where.vendorProductSubCategory = subCategory;
    }

    if (inStock === "true") {
      where.vendorProductStock = { [Op.gt]: 0 };
    } else if (inStock === "false") {
      where.vendorProductStock = 0;
    }

    const order = [];
    if (sortBy) {
      order.push([sortBy, sortOrder.toUpperCase()]);
    }

    const products = await VendorProduct.findAll({ where, order });

    res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products", error: err });
  }
}
