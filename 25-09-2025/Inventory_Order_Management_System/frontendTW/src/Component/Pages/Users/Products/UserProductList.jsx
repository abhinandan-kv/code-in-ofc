import React, { useEffect, useState } from "react";
import axios from "axios";
import UserLayout from "../../../Layout/LayoutUser";
import UserProductCard from "./UserProductCard";
import ProductFilter from "../../../Common/ProductFilter";

export default function UserProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9000/user/listallproduct",
          {
            withCredentials: true,
          }
        );

        const normalized = res.data.products.map((p) => {
          const parsedImages = Array.isArray(p.vendorProductImages)
            ? p.vendorProductImages
            : JSON.parse(p.vendorProductImages || "[]");

          const images = parsedImages.map(
            (img) => `http://localhost:9000/uploads/${img}`
          );

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
    fetchProducts();
  }, []);

  console.log(products)

  if (loading)
    return (
      <UserLayout>
        <p>Loading products...</p>
      </UserLayout>
    );

  if (error)
    return (
      <UserLayout>
        <p className="text-red-500">{error}</p>
      </UserLayout>
    );

  return (
    <UserLayout>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <UserProductCard key={p.id} product={p} />
        ))}
      </div>
    </UserLayout>
  );
}
