import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

//vendor product table- vendor will add new product
const VendorProduct = sequelize.define("VendorProduct", {
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement: true,
        primaryKey:true,
    },
    vendorId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    vendorName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    vendorProductDescription:{
        type: DataTypes.STRING,
        allowNull:false
    },
    vendorProductImages:{           //handle later
        type: DataTypes.STRING,
        allowNull:false
    },
    vendorAvgDeliveryTime:{
        type:DataTypes.STRING,
        allowNull:false
    },
    vendorProductName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    vendorProductPrice:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    vendorProductSpecifications:{
        type: DataTypes.STRING,
        allowNull:false
    },
    vendorProductStock:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    vendorProductUUID:{
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    vendorProductCategory:{
        type: DataTypes.STRING,
        // allowNull:false
        defaultValue:'misc'
    },
    vendorProductSubCategory:{
        type:DataTypes.STRING,
        defaultValue:'others'
    }
}, { paranoid: true });

try{
    await VendorProduct.sync()
    console.log("VendorProduct synced")
}catch(err){
    console.error(err)
}

export default VendorProduct