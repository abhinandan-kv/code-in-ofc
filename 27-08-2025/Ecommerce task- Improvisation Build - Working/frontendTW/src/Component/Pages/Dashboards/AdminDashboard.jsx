import React, { useEffect, useState } from "react";
import Layout from "../../Layout/LayoutAdmin";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import axios from "axios";

export default function AdminDashboard() {
  const [userData, setUserData] = useState([]);
  const [auditData, setAuditData] = useState([]);

  useEffect(() => {
    const getUserCount = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/admin/fgetallusers`, {
          withCredentials: true,
        });

        const grouped = {};
        res.data.forEach((user) => {
          const month = new Date(user.createdAt).toLocaleString("default", {
            day:"numeric",
            month: "short",
            // year: "numeric",
          });
          grouped[month] = (grouped[month] || 0) + 1;
        });

        const formatted = Object.entries(grouped).map(([month, count]) => ({
          month,
          count,
        }));

        setUserData(formatted);
      } catch (err) {
        console.error(err);
      }
    };

    const getAuditData = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/admin/audit/read`, {
          withCredentials: true,
        });

        const grouped = {};
        res.data.gettingAllLogs.forEach((log) => {
          grouped[log.eventName] = (grouped[log.eventName] || 0) + 1;
        });

        const formatted = Object.entries(grouped).map(([eventName, count]) => ({
          eventName,
          count,
        }));

        setAuditData(formatted);
      } catch (err) {
        console.error(err);
      }
    };

    getUserCount();
    getAuditData();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded shadow h-80">
          <h2 className="font-semibold mb-2">User Registrations Over Time</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={userData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 bg-white rounded shadow h-80">
          <h2 className="font-semibold mb-2">Audit Events by Type</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={auditData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="eventName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
}
