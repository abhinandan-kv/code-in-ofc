import ProductTable from "../models/productModel";
import VendorProduct from "../models/vendorProduct";

export async function addNewProduct(req, res) {
  const middlewareDataFromJWT = req.user;

  const vendorId = middlewareDataFromJWT.id;
  const vendorName = middlewareDataFromJWT.name;
  
  const {
    avgDeliveryTime,
    productName,
    productDescription,
    vendorProductImages,
    productPrice,
    productSpecifications,
    productStock,
    productCategory,
    productSubCategory,
  } = req.body;

  if (!avgDeliveryTime || !productName || !productDescription || !productPrice || !productSpecifications || !productStock) {
    res.status(400).send("Fields cant be Empty");
  }

  try {
    const addNewProductFromVendor = await VendorProduct.create({
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
    }).then(() => {
      addNewProductInProductTable();
    });

    async function addNewProductInProductTable() {
      const result = await ProductTable.create({
        name: addNewProductFromVendor.vendorName,
        description: addNewProductFromVendor.vendorProductDescription,
        price: addNewProductFromVendor.vendorProductPrice,
        availableStock: addNewProductFromVendor.vendorProductStock,
        specifications: addNewProductFromVendor.vendorProductSpecifications,
        availability: addNewProductFromVendor.vendorProductStock, // will handle later for total availability of lumsum of all vendors providing same products
        category: addNewProductFromVendor.vendorProductCategory,
        subCategory: addNewProductFromVendor.vendorProductSubCategory,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}


