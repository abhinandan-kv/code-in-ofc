import React, { useEffect, useState } from "react";
import VendorLayout from "../../../Layout/LayoutVendor";
import axios from "axios";

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:9000/vendor/allorders", { withCredentials: true });

        console.log(res.data.response);

        setOrders(res.data.response);
      } catch (err) {
        console.error(err);
        alert("Failed to load orders");
      }
    };
    fetchProducts();
  }, []);

  const statuses = ["Pending", "Confirmed", "Packed", "Shipped", "Out For Delivery", "Delivered"];



  const handleStatusChange = async (orderId, newStatus) => {
    const form = { orderId: orderId, status: newStatus };
    // console.log("form", form);
    const res = await axios.patch("http://localhost:9000/vendor/orderstatus", form, { withCredentials: true });
    // console.log("insidehanldestatus", res);
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, currentStatus: newStatus } : o)));
  };

  return (
    <VendorLayout>
      <h1 className="text-2xl font-bold mb-6">Order Status</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-gray-300  p-4 rounded-lg shadow flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-lg font-semibold">Product</h2>
                <p className="text-sm text-gray-600">
                  User ID: {order.userId} | Product ID: {order.productId}
                </p>
                <p className="text-sm text-gray-600">
                  Quantity: {order.productQuantity} | Total: ${order.productTotalPrice}
                </p>
                <p className="text-sm text-gray-600">ETA: {order.productEstimationTime}</p>
                <p className="text-sm mt-1">
                  Current Status: <span className="font-semibold">{order.currentStatus}</span>
                </p>
              </div>

              <div className="flex gap-2 mt-4 md:mt-0">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(order.id, status)}
                    className={`px-3 py-1 text-sm rounded ${
                      order.currentStatus === status ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </VendorLayout>
  );
};

export default VendorOrders;
