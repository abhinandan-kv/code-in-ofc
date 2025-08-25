import React, { useState, useEffect } from "react";
import Layout from "../../Layout/LayoutAdmin";
import axios from "axios";

export default function AdminCategoryPage() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newSubCategory, setNewSubCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:9000/vendor/categories", {
          withCredentials: true,
        });
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      alert("Category name cannot be empty");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:9000/admin/category",
        { name: newCategory },
        { withCredentials: true }
      );
      setCategories((prev) => [...prev, res.data.category]);
      setNewCategory("");
      alert("Category added successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to add category");
    }
  };

  const handleAddSubCategory = async () => {
    if (!newSubCategory.trim() || !selectedCategoryId) {
      alert("Please select category and enter subcategory name");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:9000/admin/subcategory",
        { name: newSubCategory, categoryId: selectedCategoryId },
        { withCredentials: true }
      );
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === selectedCategoryId
            ? { ...cat, SubCategories: [...(cat.SubCategories || []), res.data.subCategory] }
            : cat
        )
      );
      setNewSubCategory("");
      setSelectedCategoryId("");
      alert("Subcategory added successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to add subcategory");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Category Management</h1>

      <div className="bg-white p-6 rounded shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-3">Add Category</h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="border px-3 py-2 rounded flex-1"
          />
          <button
            onClick={handleAddCategory}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-3">Add SubCategory</h2>
        <div className="flex gap-3">
          <select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
            className="border px-3 py-2 rounded flex-1"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Enter subcategory name"
            value={newSubCategory}
            onChange={(e) => setNewSubCategory(e.target.value)}
            className="border px-3 py-2 rounded flex-1"
          />
          <button
            onClick={handleAddSubCategory}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add
          </button>
        </div>
      </div>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Subcategories
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td className="px-6 py-4 whitespace-nowrap font-semibold">
                  {cat.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {cat.SubCategories?.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {cat.SubCategories.map((sub) => (
                        <li key={sub.id}>{sub.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-500">No subcategories</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
