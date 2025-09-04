import React, { useState } from "react";
import axios from "axios";

const Filter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    authorName: "",
    bookName: "",
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

      const res = await axios.get(`http://localhost:9000/user/filter?${params.toString()}`, { withCredentials: true });

      onFilter(res.data.books);
    } catch (err) {
      console.error("Filter error:", err);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 dark:text-white rounded shadow-md mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      <input
        type="text"
        name="authorName"
        placeholder="authorName"
        value={filters.authorName}
        onChange={handleChange}
        className="p-2 border rounded"
      />
      <input type="text" name="bookName" placeholder="bookName" value={filters.bookName} onChange={handleChange} className="p-2 border rounded" />

      <button onClick={applyFilters} className="col-span-2 md:col-span-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Apply
      </button>
    </div>
  );
};

export default Filter;
