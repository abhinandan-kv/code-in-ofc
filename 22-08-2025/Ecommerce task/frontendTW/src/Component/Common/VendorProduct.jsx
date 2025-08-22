import React, { useState, useEffect } from "react";
import axios from "axios";
import VendorLayout from "../../../Layout/LayoutVendor";
import VendorProductCard from "./VendorProductCard";
import UpdateProductForm from "../Forms/UpdateProductForm";
import DeleteProductForm from "../Forms/DeleteProductForm";
import AddProductForm from "../Forms/AddProductForm";
import ProductFilterSort from "../../Common/ProductFilterSort"; 

const VendorProducts = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(null); 
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (filters = {}) => {
    try {
      const res = await axios.get("http://localhost:9000/vendor/allproducts", {
        params: filters,
        withCredentials: true,
      });

      const normalized = res.data.result.map((p) => ({
        ...p,
        images: Array.isArray(p.vendorProductImages)
          ? p.vendorProductImages
          : JSON.parse(p.vendorProductImages || "[]"),
      }));

      setProducts(normalized);
    } catch (err) {
      console.error(err);
      alert("Failed to load products");
    }
  };

  const handleAddSuccess = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
    setShowForm(null);
  };

  const handleUpdateSubmit = async (values, files) => {
    if (!selectedProduct) return;
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => formData.append(key, values[key]));
      if (files?.length) {
        Array.from(files).forEach((file) => formData.append("files", file));
      }

      const res = await axios.patch(
        `http://localhost:9000/vendor/updateproduct/${selectedProduct.id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setProducts((prev) =>
        prev.map((p) => (p.id === selectedProduct.id ? res.data.updatedProduct : p))
      );
      setShowForm(null);
      alert(" Product updated successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Failed to update product");
    }
  };

  const handleDeleteSubmit = async (values) => {
    try {
      await axios.delete(
        `http://localhost:9000/vendor/deleteproduct/${values.productId}`,
        { withCredentials: true }
      );

      setProducts((prev) => prev.filter((p) => p.id !== Number(values.productId)));
      setShowForm(null);
      alert(" Product deleted successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Failed to delete product");
    }
  };

  return (
    <VendorLayout>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4">
          <ProductFilterSort onProductsUpdate={setProducts} />
        </div>

        <div className="md:w-3/4 flex flex-col gap-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Products</h1>
            <div className="space-x-2">
              <button
                onClick={() => setShowForm("add")}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                New Product
              </button>
              <button
                onClick={() => {
                  setSelectedProduct(products[0] || null);
                  setShowForm("update");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Update Product
              </button>
              <button
                onClick={() => setShowForm("delete")}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>

          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <VendorProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-gray-300 rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              onClick={() => setShowForm(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {showForm === "add" && <AddProductForm onSuccess={handleAddSuccess} />}
            {showForm === "update" && selectedProduct && (
              <UpdateProductForm product={selectedProduct} onSubmit={handleUpdateSubmit} />
            )}
            {showForm === "delete" && <DeleteProductForm onSubmit={handleDeleteSubmit} />}
          </div>
        </div>
      )}
    </VendorLayout>
  );
};

export default VendorProducts;
