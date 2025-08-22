import ProductTable from "../models/productModel.js";
import VendorProduct from "../models/vendorProduct.js";
import url from "url";
import path from "path";
import UserVendorOrder from "../models/userVendorOrderModel.js";
import auditFunctionality from "../utils/auditLogMaker.js";
import { Op } from "sequelize";

export async function addNewProduct(req, res) {
  const middlewareDataFromJWT = req.user;

  const vendorId = middlewareDataFromJWT.id;
  const vendorName = middlewareDataFromJWT.name;
  const vendorRole = middlewareDataFromJWT.role;
  const vendorEmail = middlewareDataFromJWT.email;

  const { avgDeliveryTime, productName, productDescription, productPrice, productSpecifications, productStock, productCategory, productSubCategory } =
    req.body;

  //   console.log(
  //     "consoleeeee:-",
  //     avgDeliveryTime,
  //     productName,
  //     productDescription,
  //     productPrice,
  //     productSpecifications,
  //     productStock,
  //     productCategory,
  //     productSubCategory,
  //     middlewareDataFromJWT.role
  //   );

  if (!avgDeliveryTime || !productName || !productDescription || !productPrice || !productSpecifications || !productStock) {
    return res.status(400).send("Fields cant be Empty");
  }

  if (middlewareDataFromJWT.role == "user") {
    return res.status(401).send("You are unauthorized");
  }

  const __fileName = url.fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__fileName);
  const __parentDirname = path.dirname(__dirname);

  try {
    const imagePaths = req.files.map((file) => { 
      return file.path
      // return `file:///${__parentDirname}/uploads/vendor${vendorId}/products/${file.filename}`;

      // console.log("Inside imagepath map function ", `file:///${__parentDirname}/uploads/vendor${vendorId}/products/${file.filename}`);
    }); // handle this later foreach vendor have separate save locations - handled
    //  console.log("typeof imagepath:", typeof imagePaths, "image paths :-", imagePaths);

    const addNewProductFromVendor = await VendorProduct.create({
      vendorId: vendorId,
      vendorName: vendorName,
      vendorProductDescription: productDescription,
      vendorProductImages: JSON.stringify(imagePaths),
      vendorAvgDeliveryTime: avgDeliveryTime,
      vendorProductName: productName,
      vendorProductPrice: productPrice,
      vendorProductSpecifications: productSpecifications,
      vendorProductStock: productStock,
      vendorProductCategory: productCategory,
      vendorProductSubCategory: productSubCategory,
    });

    auditFunctionality(vendorId, vendorName, vendorRole, vendorEmail, `added new product, productId:${addNewProductFromVendor.id}`);

    res.status(201).json({
      message: "Product added successfully",
      product: addNewProductFromVendor,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function listAllProducts(req, res) {
  const middlewareDataFromJWT = req.user;

  const vendorId = middlewareDataFromJWT.id;
  const vendorName = middlewareDataFromJWT.name;
  const vendorRole = middlewareDataFromJWT.role;
  const vendorEmail = middlewareDataFromJWT.email;

  try {
    if (middlewareDataFromJWT.role == "user") {
      return res.status(401).send("You are unauthorized");
    }

    const result = await VendorProduct.findAll({
      where: { vendorId: vendorId },
    });

    if (result.length == 0) {
      return res.status(404).send("Vendor doesnot have any product");
    }

    auditFunctionality(vendorId, vendorName, vendorRole, vendorEmail, `listed all products`);

    res.status(200).send({ message: "Products Found", result });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function listSingleProduct(req, res) {
  const middlewareDataFromJWT = req.user;

  const vendorId = middlewareDataFromJWT.id;
  const vendorName = middlewareDataFromJWT.name;
  const vendorRole = middlewareDataFromJWT.role;
  const vendorEmail = middlewareDataFromJWT.email;

  const productId = req.params.id;

  try {
    if (middlewareDataFromJWT.role == "user") {
      return res.status(401).send("You are unauthorized");
    }

    const result = await VendorProduct.findByPk(productId);

    if (result.length == 0) {
      return res.status(404).send("Vendor doesnot have any product");
    }

    auditFunctionality(vendorId, vendorName, vendorRole, vendorEmail, `listed all products`);

    res.status(200).send({ message: "Products Found", result });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function removeProduct(req, res) {
  const middlewareDataFromJWT = req.user;
  const id = req.params.id;

  const vendorId = middlewareDataFromJWT.id;
  const vendorName = middlewareDataFromJWT.name;
  const vendorRole = middlewareDataFromJWT.role;
  const vendorEmail = middlewareDataFromJWT.email;

  if (middlewareDataFromJWT.role == "user") {
    return res.status(401).send("You are unauthorized");
  }

  try {
    const itemExists = await VendorProduct.findByPk(id);

    if (!itemExists) {
      return res.status(404).send("Product DoesNot exists OR its already removed.");
    }
    const result = await VendorProduct.destroy({ where: { id: id } });

    // if(result){
    //   const removeProductFromProductTable = await VendorProduct.destroy({where:{}})
    // }

    const products = await VendorProduct.findAll({
      where: { vendorId: vendorId },
    });

    auditFunctionality(vendorId, vendorName, vendorRole, vendorEmail, `removed a product, productId:${id}`);

    res.status(200).json({ message: "item deleted successfully", remainingProductsAre: products });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function updateProduct(req, res) {
  const middlewareDataFromJWT = req.user;
  const { avgDeliveryTime, productName, productDescription, productPrice, productSpecifications, productStock, productCategory, productSubCategory } =
    req.body;

  //  console.log(JSON.stringify(Object.fromEntries(req.body)))      //handle later if using form-data
  console.log(
    avgDeliveryTime,
    productName,
    productDescription,
    productPrice,
    productSpecifications,
    productStock,
    productCategory,
    productSubCategory
  );
  const productToUpdateId = req.params.id;

  const vendorId = middlewareDataFromJWT.id;
  const vendorName = middlewareDataFromJWT.name;
  const vendorRole = middlewareDataFromJWT.role;
  const vendorEmail = middlewareDataFromJWT.email;

  if (middlewareDataFromJWT.role == "user") {
    return res.status(401).send("You are unauthorized");
  }

  if (!avgDeliveryTime && !productName && !productDescription && !productPrice && !productSpecifications && !productStock) {
    return res.status(400).send("All Fields cant be Empty");
  }

  try {
    const oldData = await VendorProduct.findByPk(productToUpdateId);

    const result = await VendorProduct.update(
      {
        vendorId: vendorId,
        vendorName: vendorName,
        vendorProductDescription: productDescription,
        vendorAvgDeliveryTime: avgDeliveryTime,
        vendorProductName: productName,
        vendorProductPrice: productPrice,
        vendorProductSpecifications: productSpecifications,
        vendorProductStock: productStock,
        vendorProductCategory: productCategory,
        vendorProductSubCategory: productSubCategory,
      },
      { where: { id: productToUpdateId } }
    );

    const updatedResult = await VendorProduct.findByPk(productToUpdateId);

    auditFunctionality(
      vendorId,
      vendorName,
      vendorRole,
      vendorEmail,
      `updated a product, from ${oldData} to ${updatedResult} , productId:${productToUpdateId}`
    );

    res.status(200).json({ message: "Data updated successfully", updatedProduct: updatedResult, result });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function updateProductImage(req, res) {
  const middlewareDataFromJWT = req.user;
  const productToUpdateId = req.params.id;

  const vendorId = middlewareDataFromJWT.id;
  const vendorName = middlewareDataFromJWT.name;
  const vendorRole = middlewareDataFromJWT.role;
  const vendorEmail = middlewareDataFromJWT.email;

  if (middlewareDataFromJWT.role == "user") {
    return res.status(401).send("You are unauthorized");
  }

  const __fileName = url.fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__fileName);
  const __parentDirname = path.dirname(__dirname);

  const imagePath = req.files.map((file) => {
    return `file:///${__parentDirname}/uploads/vendor${vendorId}/products`;
  }); // handle this later foreach vendor have separate save locations - handled

  try {
    const result = await VendorProduct.update(
      { vendorProductImages: JSON.stringify(imagePath) },
      { where: { id: productToUpdateId, vendorId: vendorId } }
    );

    const updatedProduct = await VendorProduct.findByPk(productToUpdateId);

    auditFunctionality(vendorId, vendorName, vendorRole, vendorEmail, `updated product image, productId:${productToUpdateId}`);

    res.status(200).json({ message: "Images successfully updated", updatedProduct: updatedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function listAllUserOrders(req, res) {
  const { id, role } = req.user;
  const middlewareDataFromJWT = req.user;
  const vendorId = middlewareDataFromJWT.id;
  const vendorName = middlewareDataFromJWT.name;
  const vendorRole = middlewareDataFromJWT.role;
  const vendorEmail = middlewareDataFromJWT.email;

  if (role == "user") {
    return res.status(401).send("You are unauthorized");
  }

  try {
    const allPendingOrders = await UserVendorOrder.findAll({ where: { vendorId: id } });

    if (allPendingOrders.length == 0) {
      return res.status(404).json({ message: "Nothing to show here", allPendingOrders });
    }

    auditFunctionality(vendorId, vendorName, vendorRole, vendorEmail, `accessed order request`);

    res.status(200).send({ message: "Pending Orders Retrived Successfully", response: allPendingOrders });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function updateOrderStatus(req, res) {
  const { id, role, email, name } = req.user;
  const { orderId, status } = req.body;

  if (role == "user") {
    return res.status(401).send("You are unauthorized");
  }

  try {
    const isOrderBelongsToVendor = await UserVendorOrder.findByPk(orderId);

    if (isOrderBelongsToVendor.vendorId != id) {
      return res.status(403).json({ message: "Unauthorized to change others order status except yours." });
    }
    const changeOrderStatus = await UserVendorOrder.update({ currentStatus: status }, { where: { id: orderId, vendorId: id } });

    const updatedStatus = await UserVendorOrder.findByPk(orderId);

    auditFunctionality(id, name, role, email, `updated order status orderId:${orderId}`);

    res.status(200).json({ message: "Order status Updated Successfully", updatedStatus });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function totalRevenueMade(req, res) {
  const { id, role, email, name } = req.user;

  try {
    if (role == "user") {
      return res.status(401).send("You are unauthorized");
    }

    const totalRevenue = await UserVendorOrder.findAll(
      { attributes: ["productTotalPrice"] },
      { where: { [Op.and]: [{ vendorId: id }, { isDelivered: true }] } },
      { paranoid: false }
    );

    console.log(totalRevenue[0])

    auditFunctionality(id, name, role, email, `accessed revenue information`);

    res.status(200).json({ message: "Total Revenue information received", revenue: totalRevenue });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}
