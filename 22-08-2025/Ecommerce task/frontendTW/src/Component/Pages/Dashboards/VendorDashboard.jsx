import React from "react";
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import LayoutVendor from "../../Layout/LayoutVendor";

export default function VendorDashboard() {
  const revenueData = [
    { month: "Jan", revenue: 3000 },
    { month: "Feb", revenue: 5000 },
    { month: "Mar", revenue: 4000 },
  ];

  const topProducts = [
    { product: "Shoes", sold: 50 },
    { product: "Bags", sold: 30 },
    { product: "Watches", sold: 20 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FF8042"];

  return (
    <LayoutVendor>
      <h1 className="text-2xl font-bold mb-6">Vendor Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded shadow h-80">
          <h2 className="font-semibold mb-2">Revenue Over Time</h2>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 bg-white rounded shadow h-80">
          <h2 className="font-semibold mb-2">Top Products</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topProducts}>
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sold" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </LayoutVendor>
  );
}
