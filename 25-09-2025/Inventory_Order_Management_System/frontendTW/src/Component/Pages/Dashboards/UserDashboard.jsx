import React, { useEffect, useState } from "react";
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import LayoutUser from "../../Layout/LayoutUser";
import axios from "axios";

export default function UserDashboard() {
  const [spendData, setSpendData] = useState([]);
  const [ordersPerMonth, setOrdersPerMonth] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:9000/user/orders", {
          withCredentials: true,
        });
        console.log(res);
        const orders = res.data.orders || [];
        console.log(orders);

        const spendMap = {};
        const ordersMap = {};

        let amount = 0;

        orders.forEach((order) => {
          const month = new Date(order.createdAt).toLocaleString("default", {
            day: "numeric",
            month: "short",
            // year: "numeric",
          });
          amount = amount + order.productTotalPrice;

          spendMap[month] = (spendMap[month] || 0) + amount;

          ordersMap[month] = (ordersMap[month] || 0) + 1;
        });

        // console.log(amount);

        const spendFormatted = Object.entries(spendMap).map(([date, amount]) => ({
          date,
          amount,
        }));

        const ordersFormatted = Object.entries(ordersMap).map(([month, orders]) => ({
          month,
          orders,
        }));

        setSpendData(spendFormatted);
        setOrdersPerMonth(ordersFormatted);
      } catch (err) {
        console.error("Error fetching user orders:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <LayoutUser>
      <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded shadow h-80">
          <h2 className="font-semibold mb-2">Spending Over Time</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={spendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 bg-white rounded shadow h-80">
          <h2 className="font-semibold mb-2">Orders Per Month</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ordersPerMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </LayoutUser>
  );
}
