import React from "react";
import { useNavigate } from "react-router-dom";

export default function VendorProductCard({ product }) {

  // console.log(product.images[0])

  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(`/vendor/product/${product.id}`, { state: { product } });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <img
        src={product.images[0]}
        alt={product.vendorProductName}  
        className="w-full h-48 object-cover rounded-md mb-4"
      />

      <div className="flex justify-between">
        <h2 className="text-lg font-bold mb-1">{product.vendorProductName}</h2>
        <p className="text-gray-700 font-semibold mb-2 ">{product.id}</p>
      </div>
      <p className="text-gray-700 font-semibold mb-2">${product.vendorProductPrice}</p>
      <p className="text-sm text-gray-600">Vendor: {product.vendorName}</p>
      <p className="text-sm text-gray-600 mb-3">Avg delivery: {product.vendorAvgDeliveryTime} days</p>

      <button
        onClick={handleViewDetail}
        className="mt-auto px-4 py-2 bg-blue-600 text-white text-center rounded hover:bg-blue-700"
      >
        View Details
      </button>
    </div>
  );
}
