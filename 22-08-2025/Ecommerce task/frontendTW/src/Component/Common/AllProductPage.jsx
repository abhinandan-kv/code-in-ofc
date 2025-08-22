import React, { useState, useEffect } from "react";
import ProductFilterSort from "../ProductFilterSort";
import VendorProductCard from "../Vendor/VendorProductCard"; 

export default function AllProductsPage() {
  const [products, setProducts] = useState([]);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      <div className="md:w-1/4">
        <ProductFilterSort onProductsUpdate={setProducts} />
      </div>

      <div className="md:w-3/4">
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
  );
}
