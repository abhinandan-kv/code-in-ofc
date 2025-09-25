import React, { useState } from "react";

const PaymentModal = ({ onClose, onConfirm }) => {
  const [method, setMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const handlePay = () => {
    setLoading(true);

    setTimeout(() => {
      const transactionId = "id" + Math.floor(Math.random() * 1000000);
      setLoading(false);
      onConfirm({ method, transactionId });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-black dark:text-white bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Choose Payment Method</h2>

        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        >
          <option value="cod">Cash on Delivery</option>
          <option value="upi">UPI</option>
          <option value="card">Credit/Debit Card</option>
        </select>

        <button
          onClick={handlePay}
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Processing Payment..." : "Pay & Confirm"}
        </button>

        <button
          onClick={onClose}
          className="w-full mt-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
