import React from "react";
import Layout from "../../Layout/LayoutAdmin";
import ProductCard from "./ProductCard";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function ProductList() {
 
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/admin/product/fall`, {
          withCredentials: true,
        });
        console.log(res.data.records);  
        setProducts(res.data.records)
      } catch (err) {
        console.error(err);
      }
    };
    getAllProducts();
  }, []);

  // console.log(products)
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </Layout>
  );
}
