// {
//     "id": 1,
//     "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//     "price": 109.95,
//     "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//     "category": "men's clothing",
//     "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
//     "rating": {
//         "rate": 3.9,
//         "count": 120
//     }
// }
const ProductCard = ({ data }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm  dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="rounded-t-lg max-w-44 max-h-44 mx-auto mt-2"
          src={data.image}
          alt="image here"
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {data.title}
          </h5>
        </a>
        <p className="mb-3  font-light text-gray-700 dark:text-gray-400">
          {truncate(data.description, 100)}
        </p>
      </div>
      <div className="p-5">
        <p className="mb-3  font-light text-gray-700 dark:text-gray-400">
          {data.category}
        </p>
        <p className="mb-3  font-light text-gray-700 dark:text-gray-400">
          Rate: {data.rating.rate}
          <br />
          Count: {data.rating.count}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;

function truncate(str, maxLength) {
  if (str.length > maxLength) {
    const truncatedStr = str.slice(0, maxLength) + "...";
    return truncatedStr;
  } else {
    return str;
  }
}
