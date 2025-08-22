import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import VendorLayout from "../../../Layout/LayoutVendor";

export default function VendorProductPage() {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);
  const [selectedImg, setSelectedImg] = useState(
    location.state?.product?.images[0] || null
  );
  const [loading, setLoading] = useState(!product);

  useEffect(() => {
    if (product) return; 

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/vendor/product/${id}`, {
          withCredentials: true,
        });

        const prod = res.data.result;

        const normalized = {
          ...prod,
          images: Array.isArray(prod.vendorProductImages)
            ? prod.vendorProductImages
            : JSON.parse(prod.vendorProductImages || "[]"),
        };

        setProduct(normalized);
        setSelectedImg(normalized.images[0] || null);
      } catch (err) {
        console.error(err);
        alert("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, product]);


  if (loading) return <VendorLayout><p>Loading...</p></VendorLayout>;
  if (!product) return <VendorLayout><p>Product not found</p></VendorLayout>;

  return (
    <VendorLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="border rounded-lg overflow-hidden">
            {selectedImg && (
              <img
                src={selectedImg}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            )}
          </div>
          <div className="flex gap-3 mt-4">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Thumb ${i}`}
                className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                  selectedImg === img ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => setSelectedImg(img)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{product.vendorProductName}</h1>
          <p className="text-xl text-gray-700 mb-2">${product.vendorProductPrice}</p>
          <p className="text-sm text-gray-600 mb-2">
            Vendor: {product.vendorName}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Avg Delivery: {product.vendorAvgDeliveryTime} days
          </p>
          <p className="text-gray-600 mb-6">{product.vendorProductDescription}</p>

          <div className="flex gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
              Buy Now
            </button>
            <button className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </VendorLayout>
  );
}
