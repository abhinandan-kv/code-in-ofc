import React, { useState } from "react";
import axios from "axios";

const ProductFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    category: "",
    subCategory: "",
    inStock: "",
    sortBy: "",
    sortOrder: "ASC",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = async () => {
    try {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const res = await axios.get(`http://localhost:9000/user/product?${params.toString()}`, { withCredentials: true });

      const normalized = res.data.products.map((p) => {
        const parsedImages = Array.isArray(p.vendorProductImages) ? p.vendorProductImages : JSON.parse(p.vendorProductImages || "[]");

        const images = parsedImages.map((img) => `http://localhost:9000/uploads${img}`);

        return { ...p, images };
      });

      onFilter(normalized);
    } catch (err) {
      console.error("Filter error:", err);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 dark:text-white rounded shadow-md mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      <input type="number" name="minPrice" placeholder="Min Price" value={filters.minPrice} onChange={handleChange} className="p-2 border rounded" />
      <input type="number" name="maxPrice" placeholder="Max Price" value={filters.maxPrice} onChange={handleChange} className="p-2 border rounded" />

      <input type="text" name="category" placeholder="Category" value={filters.category} onChange={handleChange} className="p-2 border rounded" />
      <input
        type="text"
        name="subCategory"
        placeholder="Sub Category"
        value={filters.subCategory}
        onChange={handleChange}
        className="p-2 border rounded"
      />

      <select name="inStock" value={filters.inStock} onChange={handleChange} className="p-2 border rounded dark:bg-gray-800">
        <option value="">Stock (All)</option>
        <option value="true">In Stock</option>
        <option value="false">Out of Stock</option>
      </select>

      <select name="sortBy" value={filters.sortBy} onChange={handleChange} className="p-2 border rounded dark:bg-gray-800">
        <option value="">Sort By</option>
        <option value="vendorProductPrice">Price</option>
        <option value="vendorProductName">Name</option>
        <option value="createdAt">Date Added</option>
      </select>

      <select name="sortOrder" value={filters.sortOrder} onChange={handleChange} className="p-2 border rounded dark:bg-gray-800">
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>

      <button onClick={applyFilters} className="col-span-2 md:col-span-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Apply
      </button>
    </div>
  );
};

export default ProductFilter;
