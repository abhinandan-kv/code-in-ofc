import { useGetProductsQuery } from "../app/features/api/apiSlice";
import ProductCard from "./ProductCard";
import Loader from "./Loader/Loader";

const ProductDisplay = () => {
  const { data, error, isLoading } = useGetProductsQuery();
  console.log(data)

  if (error) {
    return <h2>Error Occured: {error}</h2>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full  grid grid-cols-5 gap-2 bg-gray-900">
      {data.map((val, idx) => (
        <ProductCard data={val} key={idx} />
      ))}
    </div>
  );
};

export default ProductDisplay;
