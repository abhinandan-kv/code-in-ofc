import React, { useState, useEffect } from "react";
import Layout from "../../Layout/LayoutAdmin";
import ProductCard from "./ProductCard";
import axios from "axios";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9000/admin/product/fall",
          {
            withCredentials: true,
          }
        );
        console.log("res", res);

        const normalized = res.data.records.map((p) => {
          const parsedImages = Array.isArray(p.vendorProductImages)
            ? p.vendorProductImages
            : JSON.parse(p.vendorProductImages || "[]");

          const images = parsedImages.map(
            (img) => `http://localhost:9000/uploads/${img}`
          );
          console.log(images);
          return { ...p, images };
        });

        setProducts(normalized);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    getAllProducts();
  }, []);

  console.log(products);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 bg-gray-600 text-white rounded items-end hover:bg-gray-700"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>
      {showFilters && <ProductFilter onFilter={setProducts} />}

      {loading && <p className="text-gray-500">Loading products...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p className="text-gray-600">No products found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </Layout>
  );
}
