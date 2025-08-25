import React, { useEffect, useState } from "react";
import UserLayout from "../../../Layout/LayoutUser";
import axios from "axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:9000/user/orders", {
          withCredentials: true,
        });
        // console.log(res)
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <UserLayout>
        <p className="text-center py-6">Loading orders...</p>
      </UserLayout>
    );
  }

  if (orders.length === 0) {
    return (
      <UserLayout>
        <div className="text-center py-10">
          <p className="text-gray-600 text-lg">You have no orders yet.</p>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
          >
            <div className="flex justify-between items-center mb-3">
              <p className="font-semibold text-lg">
                Order #{order.id} – {order.productUUID}
              </p>
              <span
                className={`px-3 py-1 rounded text-white ${
                  order.currentStatus === "Pending"
                    ? "bg-yellow-500"
                    : order.currentStatus === "Delivered"
                    ? "bg-green-600"
                    : "bg-gray-500"
                }`}
              >
                {order.currentStatus}
              </span>
            </div>

            <p className="text-gray-700">
              <span className="font-medium">Quantity:</span>{" "}
              {order.productQualitity}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Total Price:</span> $
              {order.productTotalPrice}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Estimated Delivery:</span>{" "}
              {order.productEstimationTime} days
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Ordered on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </UserLayout>
  );
};

export default OrderList;
