import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Layout from "../../Layout/LayoutAdmin";

export default function ProductPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(location.state?.product || null);
  const [selectedImg, setSelectedImg] = useState(
    location.state?.product?.images?.[0] || null
  );
  const [loading, setLoading] = useState(!product);

  useEffect(() => {
    if (product) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9000/admin/product/single/${id}`,
          { withCredentials: true }
        );

        const prod = res.data.records;
        const parsedImages = Array.isArray(prod.vendorProductImages)
          ? prod.vendorProductImages
          : JSON.parse(prod.vendorProductImages || "[]");

        const images = parsedImages.map(
          (img) => `http://localhost:9000/uploads/${img}`
        );

        const normalized = { ...prod, images };
        setProduct(normalized);
        setSelectedImg(images[0] || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, product]);

  const handleDeleteProduct = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:9000/admin/product/delete/${id}`, {
        withCredentials: true,
      });
      alert("Product deleted successfully");
      navigate("/products"); 
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  const handleRemoveVendor = async () => {
    if (!window.confirm("Are you sure you want to remove this vendor?")) return;

    try {
      await axios.delete(
        `http://localhost:9000/admin/delete/${product.vendorId}`,
        { withCredentials: true }
      );
      alert("Vendor removed successfully");
      navigate("/vendors"); 
    } catch (err) {
      console.error(err);
      alert("Failed to remove vendor");
    }
  };

  if (loading)
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  if (!product)
    return (
      <Layout>
        <p>Product not found</p>
      </Layout>
    );

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="border rounded-lg overflow-hidden">
            {selectedImg && (
              <img
                src={selectedImg}
                alt={product.vendorProductName}
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
          <h1 className="text-3xl font-bold mb-4">
            {product.vendorProductName}
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            ${product.vendorProductPrice}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            Vendor: {product.vendorName}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Avg Delivery: {product.vendorAvgDeliveryTime} days
          </p>
          <p className="text-gray-600 mb-6">
            {product.vendorProductDescription}
          </p>

          <div className="flex gap-4">
            <button
              onClick={handleDeleteProduct}
              className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete Product
            </button>
            <button
              onClick={handleRemoveVendor}
              className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800"
            >
              Remove Vendor
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
