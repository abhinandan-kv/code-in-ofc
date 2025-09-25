import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VendorLayout from "../../../Layout/LayoutVendor";
import VendorProductCard from "./VendorProductCard";
import UpdateProductForm from "../Forms/UpdateProductForm";
import DeleteProductForm from "../Forms/DeleteProductForm";
import AddProductForm from "../Forms/AddProductForm";
import ProductFilter from "../../../Common/ProductFilter";

const VendorProducts = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9000/vendor/allproducts",
          { withCredentials: true }
        );

        const normalized = res.data.result.map((p) => {
          const parsedImages = Array.isArray(p.vendorProductImages)
            ? p.vendorProductImages
            : JSON.parse(p.vendorProductImages || "[]");

          const images = parsedImages.map(
            (newPath) => `http://localhost:9000/uploads/${newPath}`
          );

          return { ...p, images };
        });

        setProducts(normalized);
      } catch (err) {
        console.error(err);
        alert("Failed to load products");
      }
    };

    fetchProducts();
  }, []);

  console.log(products);

  // products.map((product)=>{
  //   console.log(product)
  // })
  // console.log("Fetched -", products[0].vendorProductImages)

  const handleAddSuccess = (newProduct) => {
    const parsedImages = Array.isArray(newProduct.vendorProductImages)
      ? newProduct.vendorProductImages
      : JSON.parse(newProduct.vendorProductImages || "[]");

    const images = parsedImages.map(
      (newPath) => `http://localhost:9000/uploads/${newPath}`
    );

    const normalizedProduct = { ...newProduct, images };

    setProducts((prev) => [...prev, normalizedProduct]);
    setShowForm(null);
  };

  const handlePrompt = () => {
    const input = prompt("Please Product Id to update");
    if (input !== null) {
      setSelectedProduct(input);
    }
  };

  const handleUpdateSubmit = async (values) => {
    console.log(values);

    if (!selectedProduct) return;
    try {
      const formData = JSON.stringify(values);
      console.log(formData);

      const res = await axios.patch(
        `http://localhost:9000/vendor/updateproduct/${selectedProduct}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      setProducts((prev) =>
        prev.map((p) =>
          p.id === selectedProduct ? res.data.updatedProduct : p
        )
      );
      setShowForm(null);
      alert("Product updated successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Failed to update product");
    }
  };

  // const onSubmit = async (values) => {
  //   alert(JSON.stringify(values, null, 2));
  //   const formData  = JSON.stringify(values)
  //   const res = await axios.patch(`http://localhost:9000/vendor/updateproduct/${selectedProduct}`, formData, {
  //     withCredentials: true,
  //     headers: { "Content-Type": "multipart/form-data" },
  //   });
  // };

  const handleDeleteSubmit = async (values) => {
    try {
      await axios.delete(
        `http://localhost:9000/vendor/deleteproduct/${values.productId}`,
        { withCredentials: true }
      );

      setProducts((prev) =>
        prev.filter((p) => p.id !== Number(values.productId))
      );
      setShowForm(null);
      alert("Product deleted successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Failed to delete product");
    }
  };

  const handleViewDetail = (product) => {
    navigate(`/vendor/product/${product.id}`, { state: { product } });
  };

  return (
    <VendorLayout>
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
              handlePrompt();
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
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 bg-gray-600 text-white rounded items-end hover:bg-gray-700"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>
      {showFilters && <ProductFilter onFilter={setProducts} />}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <VendorProductCard
            key={product.id}
            product={product}
            onViewDetail={() => handleViewDetail(product)}
          />
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-gray-300 rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              onClick={() => setShowForm(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ❌
            </button>

            {showForm === "add" && (
              <AddProductForm onSuccess={handleAddSuccess} />
            )}
            {showForm === "update" && selectedProduct && (
              <UpdateProductForm
                product={selectedProduct}
                onSubmit={handleUpdateSubmit}
              />
            )}
            {showForm === "delete" && (
              <DeleteProductForm onSubmit={handleDeleteSubmit} />
            )}
          </div>
        </div>
      )}
    </VendorLayout>
  );
};

export default VendorProducts;
