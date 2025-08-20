import ProductTable from "../models/productModel.js";
import VendorProduct from "../models/vendorProduct.js";
import url from "url";
import path from "path";

export async function addNewProduct(req, res) {
  const middlewareDataFromJWT = req.user;

  const vendorId = middlewareDataFromJWT.id;
  const vendorName = middlewareDataFromJWT.name;

  const { avgDeliveryTime, productName, productDescription, productPrice, productSpecifications, productStock, productCategory, productSubCategory } =
    req.body;

  if (!avgDeliveryTime || !productName || !productDescription || !productPrice || !productSpecifications || !productStock) {
    res.status(400).send("Fields cant be Empty");
  }

  if (middlewareDataFromJWT.role == "user") {
    res.status(401).send("You are unauthorized");
  }

  const __fileName = url.fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__fileName);
  const __parentDirname = path.dirname(__dirname);

  const imagePath = req.files.map((file) => {
    `file:///${__parentDirname}/uploads/vendor${id}/products`;
  }); // handle this later foreach vendor have separate save locations

  try {
    const addNewProductFromVendor = await VendorProduct.create({
      vendorId: vendorId,
      vendorName: vendorName,
      vendorProductDescription: productDescription,
      vendorProductImages: imagePath.join(","),
      vendorAvgDeliveryTime: avgDeliveryTime,
      vendorProductName: productName,
      vendorProductPrice: productPrice,
      vendorProductSpecifications: productSpecifications,
      vendorProductStock: productStock,
      vendorProductCategory: productCategory,
      vendorProductSubCategory: productSubCategory,
    });
    // .then(() => {
    //   addNewProductInProductTable();
    // });

    // async function addNewProductInProductTable() {
    //   const result = await ProductTable.create({
    //     name: addNewProductFromVendor.vendorName,
    //     description: addNewProductFromVendor.vendorProductDescription,
    //     price: addNewProductFromVendor.vendorProductPrice,
    //     availableStock: addNewProductFromVendor.vendorProductStock,
    //     specifications: addNewProductFromVendor.vendorProductSpecifications,
    //     availability: addNewProductFromVendor.vendorProductStock, // will handle later for total availability of lumsum of all vendors providing same products
    //     category: addNewProductFromVendor.vendorProductCategory,
    //     subCategory: addNewProductFromVendor.vendorProductSubCategory,
    //   });
    // }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function listAllProducts(req, res) {
  const middlewareDataFromJWT = req.user;

  const vendorId = middlewareDataFromJWT.id;
  // const vendorName = middlewareDataFromJWT.name;

  try {
    if (middlewareDataFromJWT.role == "user") {
      res.status(401).send("You are unauthorized");
    }

    const result = await VendorProduct.findAll({ where: { vendorId: vendorId } });

    if (!result) {
      res.status(404).send("Vendor doesnot have any product");
    }

    res.status(200).json({ message: "Products Found", result });
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

  if (middlewareDataFromJWT.role == "user") {
    res.status(401).send("You are unauthorized");
  }

  try {
    const result = await VendorProduct.destroy({ where: { id: id } });

    // if(result){
    //   const removeProductFromProductTable = await VendorProduct.destroy({where:{}})
    // }

    const products = await VendorProduct.findAll({ where: { vendorId: vendorId } });

    res.status(200).json({ message: "item deleted successfully", products });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export async function updateProduct(req, res) {
  const middlewareDataFromJWT = req.user;
  const { avgDeliveryTime, productName, productDescription, productPrice, productSpecifications, productStock, productCategory, productSubCategory } =
    req.body;

  const productToUpdateId = req.params.id;

  const vendorId = middlewareDataFromJWT.id;
  const vendorName = middlewareDataFromJWT.name;

  if (middlewareDataFromJWT.role == "user") {
    res.status(401).send("You are unauthorized");
  }

  if (!avgDeliveryTime && !productName && !productDescription && !productPrice && !productSpecifications && !productStock) {
    res.status(400).send("All Fields cant be Empty");
  }

  try {
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

    res.status(200).json({ message: "Data updated successfully", result });
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

  if (middlewareDataFromJWT.role == "user") {
    res.status(401).send("You are unauthorized");
  }

  const __fileName = url.fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__fileName);
  const __parentDirname = path.dirname(__dirname);

  const imagePath = req.files.map((file) => {
    `file:///${__parentDirname}/uploads/vendor${id}/products`;
  }); // handle this later foreach vendor have separate save locations

  try {
    const updateProductImg = await VendorProduct.update({ vendorProductImages: imagePath.join(",") }, { where: { id: productToUpdateId } });

    res.status(200).send("Images successfully updated");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}
