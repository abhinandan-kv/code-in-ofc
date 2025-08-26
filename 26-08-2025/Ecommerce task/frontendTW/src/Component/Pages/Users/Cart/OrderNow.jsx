import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserLayout from "../../../Layout/LayoutUser";
import axios from "axios";
import PaymentModal from "../Payment/PaymentModel";

const OrderNow = () => {
  const { id } = useParams(); // productId
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const navigate = useNavigate();

  const handleConfirmPayment = async ({ method, transactionId }) => {
    setShowPayment(false);
    setLoading(true);

    try {
      const res = await axios.post(
        `http://localhost:9000/user/singleorder/${id}/${quantity}`,
        { paymentMethod: method, transactionId },
        { withCredentials: true }
      );

      alert(
        `Order placed!\nPayment: ${method}\nTransaction: ${transactionId}\nMessage: ${res.data.message}`
      );

      navigate("/users/orders", { state: { order: res.data.order } });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
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
        <button
          onClick={() => setShowPayment(true)}
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Placing Order..." : "Proceed to Payment"}
        </button>
      </div>

      {showPayment && (
        <PaymentModal
          onClose={() => setShowPayment(false)}
          onConfirm={handleConfirmPayment}
        />
      )}
    </UserLayout>
  );
};

export default OrderNow;
