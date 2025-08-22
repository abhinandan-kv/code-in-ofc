export default function ProductFilterSort({ onProductsUpdate }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [inStock, setInStock] = useState("");
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
      onProductsUpdate(res.data.products || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Filters Section */}
      <div className="p-4 border rounded-lg shadow-md bg-gray-50">
        {/* ... all your filter controls ... */}
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded shadow"
          onClick={fetchProducts}
        >
          Apply Filters
        </button>
      </div>

      <div className="p-4 border rounded-lg shadow-md bg-gray-50">
        {/* ... all your sort controls ... */}
        <button
          className="px-4 py-2 bg-green-600 text-white rounded shadow"
          onClick={fetchProducts}
        >
          Apply Sort
        </button>
      </div>
    </div>
  );
}
