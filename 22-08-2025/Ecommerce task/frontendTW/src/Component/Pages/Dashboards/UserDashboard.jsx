import React from "react";
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import LayoutUser from "../../Layout/LayoutUser";

export default function UserDashboard() {
  const spendData = [
    { date: "Jan", amount: 200 },
    { date: "Feb", amount: 450 },
    { date: "Mar", amount: 300 },
  ];

  const ordersPerMonth = [
    { month: "Jan", orders: 3 },
    { month: "Feb", orders: 5 },
    { month: "Mar", orders: 4 },
  ];

  const COLORS = ["#00C49F", "#FF8042", "#8884d8"];

  return (
    <LayoutUser>
      <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded shadow h-80">
          <h2 className="font-semibold mb-2">Spending Over Time</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={spendData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 bg-white rounded shadow h-80">
          <h2 className="font-semibold mb-2">Orders Per Month</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ordersPerMonth}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </LayoutUser>
  );
}
