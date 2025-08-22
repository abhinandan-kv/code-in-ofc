import React, { useState } from "react";
import UserLayout from "../../../Layout/LayoutUser";
import { useEffect } from "react";
import axios from "axios";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function getCartItems() {
      try {
        const res = await axios.get("http://localhost:9000/user/showcart", { withCredentials: true });

        console.log(res.data);
        setCartItems(res.data.cart);
      } catch (err) {
        console.error(err);
      //   alert(err);
      }
    }
    getCartItems();
  }, []);

  const handleRemove = async (productId) => {
    console.log("clicked", productId);

    try {
      const res = await axios.delete(`http://localhost:9000/user/removeitemfromcart/${productId}`, { withCredentials: true });
      console.log(res);
      if (res) {
        alert("Item deleted successfully");
      }
      //   const newCartData = await axios.get("http://localhost:9000/user/showcart", { withCredentials: true });
      //   console.log(newCartData.data.cart);
      //   setCartItems(newCartData.data.cart);
    } catch (err) {
      console.error(err);
      // alert(err);
    }

    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const handleOrderWholeCart = () => {
    console.log("Ordering whole cart...");
  };

  return (
    <UserLayout>
      <h1 className="text-2xl font-bold mb-6">My Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.dataValues.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <h2 className="font-semibold">UserID:{item.dataValues.userId}</h2>
                <p className="text-sm text-gray-600">ProductID: ${item.dataValues.productId}</p>
                <p className="text-sm">Added At: {item.dataValues.createdAt}</p>
              </div>
              <button onClick={() => handleRemove(item.dataValues.id)} className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-end mt-6">
            <button onClick={handleOrderWholeCart} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Order Whole Cart
            </button>
          </div>
        </div>
      )}
    </UserLayout>
  );
};

export default CartPage;
