import React, { useEffect, useState } from "react";
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import LayoutVendor from "../../Layout/LayoutVendor";
import axios from "axios";

export default function VendorDashboard() {
  const [revenueData, setRevenueData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchVendorStats = async () => {
      try {
        const res = await axios.get("http://localhost:9000/vendor/allorders", {
          withCredentials: true,
        });

        console.log(res.data.response);

        const orders = res.data.response || [];

        // console.log(orders);

        const revenueMap = {};
        const productMap = {};

        // let amount = 0;

        orders.forEach((order) => {
          const month = new Date(order.createdAt).toLocaleString("default", {
            day: "numeric",
            month: "short",
            // year: "numeric",
          });
          // console.log(order.productTotalPrice);
          // amount = amount + order.productTotalPrice;

          revenueMap[month] = (revenueMap[month] || 0) + order.productTotalPrice;

          const productName = order.productId || "Unknown Product";
          productMap[productName] = (productMap[productName] || 0) + order.productQualitity;
        });

        // console.log(amount);

        const revenueFormatted = Object.entries(revenueMap).map(([month, revenue]) => ({
          month,
          revenue,
        }));

        const productsFormatted = Object.entries(productMap).map(([product, sold]) => ({
          product,
          sold,
        }));

        setRevenueData(revenueFormatted);
        setTopProducts(productsFormatted);
      } catch (err) {
        console.error("Error fetching vendor orders:", err);
      }
    };

    fetchVendorStats();
  }, []);

  return (
    <LayoutVendor>
      <h1 className="text-2xl font-bold mb-6">Vendor Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded shadow h-80">
          <h2 className="font-semibold mb-2">Revenue Over Time</h2>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 bg-white rounded shadow h-80">
          <h2 className="font-semibold mb-2">Top Products</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sold" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </LayoutVendor>
  );
}
