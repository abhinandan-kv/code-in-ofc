import productCategory from "./productCategoryModel.js";
import Product from "./productModel.js";
import productSubCategory from "./productSubCategoryModel.js";

Product.hasOne(productCategory, { foreignKey: "category" });
productCategory.belongsToMany(Product);

productCategory.hasMany(productSubCategory, { foreignKey: "subCategory", onDelete: "CASCADE" });
productSubCategory.belongsToMany(productCategory);

export { Product, productCategory, productSubCategory };
