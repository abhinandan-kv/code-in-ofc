import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ProductFilterSort() {
  const [products, setProducts] = useState([]);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [inStock, setInStock] = useState(""); // true false
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("ASC");

  const fetchProducts = async () => {
    try {
      const params = {};

      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      if (category) params.category = category;
      if (subCategory) params.subCategory = subCategory;
      if (inStock) params.inStock = inStock;
      if (sortBy) {
        params.sortBy = sortBy;
        params.sortOrder = sortOrder;
      }

      const res = await axios.get("http://localhost:9000/user/product/", { params });
      setProducts(res.data.products || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="p-4 border rounded-lg shadow-md bg-gray-50">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Price filter */}
          <div>
            <label className="block font-medium">Min Price</label>
            <input
              type="number"
              className="border p-2 w-full rounded"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium">Max Price</label>
            <input
              type="number"
              className="border p-2 w-full rounded"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium">Category</label>
            <select
              className="border p-2 w-full rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="grocery">Grocery</option>
            </select>
          </div>

          {/* Sub Category */}
          <div>
            <label className="block font-medium">Sub Category</label>
            <select
              className="border p-2 w-full rounded"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="">All</option>
              <option value="mobiles">Mobiles</option>
              <option value="laptops">Laptops</option>
              <option value="clothes">Clothes</option>
            </select>
          </div>

          {/* In Stock Filter */}
          <div className="col-span-2 flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={inStock === "true"}
                onChange={(e) =>
                  setInStock(e.target.checked ? "true" : "")
                }
              />
              In Stock
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={inStock === "false"}
                onChange={(e) =>
                  setInStock(e.target.checked ? "false" : "")
                }
              />
              Out of Stock
            </label>
          </div>
        </div>

        {/* Apply Filters */}
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded shadow"
          onClick={fetchProducts}
        >
          Apply Filters
        </button>
      </div>

      {/* Sorting */}
      <div className="p-4 border rounded-lg shadow-md bg-gray-50">
        <h2 className="text-xl font-bold mb-4">Sort</h2>
        <div className="flex gap-4 items-center">
          <select
            className="border p-2 rounded"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">None</option>
            <option value="vendorProductPrice">Price</option>
            <option value="vendorProductName">Name</option>
            <option value="vendorAvgDeliveryTime">Delivery Time</option>
          </select>

          <select
            className="border p-2 rounded"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>

          <button
            className="px-4 py-2 bg-green-600 text-white rounded shadow"
            onClick={fetchProducts}
          >
            Apply Sort
          </button>
        </div>
      </div>

      {/* Product List */}
      <div>
        <h2 className="text-xl font-bold mb-4">Products</h2>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {products.map((p: any) => (
              <div
                key={p.id}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                <img
                  src={p.vendorProductImages}
                  alt={p.vendorProductName}
                  className="h-32 w-full object-cover rounded mb-2"
                />
                <h3 className="font-semibold">{p.vendorProductName}</h3>
                <p className="text-gray-600">{p.vendorProductDescription}</p>
                <p className="font-bold">₹{p.vendorProductPrice}</p>
                <p
                  className={`${
                    p.vendorProductStock > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {p.vendorProductStock > 0 ? "In Stock" : "Out of Stock"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
