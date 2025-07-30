import Product from "../model/dbProductModel.js";
import User from "../model/dbUserModel.js";


const runTest = async () => {
    const newProduct = await Product.create({
        productName: "iPhone 15",
        productPrice: 999
    });

    const newUser = await User.create({
        firstName: "John",
        lastName: "Doe",
        productId: newProduct.id //  this connects the user to the product
    });

    // Now fetch user with associated product
    const userWithProduct = await User.findOne({
        where: { id: newUser.id },
        include: {
            model: Product,
            as: 'product'
        }
    });

    console.log(JSON.stringify(userWithProduct, null, 2));
};

console.error(console.error);


export default runTest