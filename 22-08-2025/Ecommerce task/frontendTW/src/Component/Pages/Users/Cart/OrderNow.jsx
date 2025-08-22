import React, { useState } from "react";
import { useParams } from "react-router-dom";
import UserLayout from "../../../Layout/LayoutUser";
import axios from "axios";

const OrderNow = () => {
  const { id } = useParams(); // productId
  const [quantity, setQuantity] = useState(1);

  const handleOrder = async () => {
    console.log(`Ordering product ${id} with quantity ${quantity}`);
    console.log(localStorage.getItem("token"));
    
    try {
      const res = await axios.post(`http://localhost:9000/user/singleorder/${id}/${quantity}`, {
          headers: { Authorization: localStorage.getItem("token") },
      });
      console.log(res);
      alert(res);
    } catch (err) {
      console.error(err);
      alert(err);
    }
  };

  return (
    <UserLayout>
      <h1 className="text-2xl font-bold mb-6">Place Order</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md max-w-md">
        <label className="block mb-3 font-semibold">
          Quantity
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="mt-1 block w-full p-2 border rounded"
          />
        </label>
        <button onClick={handleOrder} className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Confirm Order
        </button>
      </div>
    </UserLayout>
  );
};

export default OrderNow;
