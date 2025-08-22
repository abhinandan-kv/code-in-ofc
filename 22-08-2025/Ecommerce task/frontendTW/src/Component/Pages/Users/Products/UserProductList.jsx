import React, { useEffect, useState } from "react";
import axios from "axios";
import UserLayout from "../../../Layout/LayoutUser";
import UserProductCard from "./UserProductCard";

export default function UserProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:9000/user/listallproduct", {
          headers: { Authorization: localStorage.getItem("token") },
        });
        console.log(res.product);
        setProducts(res.data.products || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <UserProductCard key={p.id} product={p} />
        ))}
      </div>
    </UserLayout>
  );
}
