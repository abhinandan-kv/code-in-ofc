import React from "react";
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
} from "recharts";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function AdminDashboard() {


  const [userData, setUserData] = useState([]);
  const [auditData, setAuditdata] = useState([]);
  const [auditOperations, setAuditOperations] = useState([])

  useEffect(() => {
    const getUserCount = async () => {
      try {
        // const res = await axios.get(`http://localhost:9000/admin/usercount`, { withCredentials: true });

        const res = await axios.get(`http://localhost:9000/admin/fgetallusers`, { withCredentials: true });

        console.log(res);
        setUserData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const getAuditData = async () => {
      try {
        // const res = await axios.get(`http://localhost:9000/admin/usercount`, { withCredentials: true });

        const res = await axios.get(`http://localhost:9000/admin/audit/read`, { withCredentials: true });

        console.log("auditData-", res.data.gettingAllLogs);
        setAuditdata(res.data.gettingAllLogs);
      } catch (err) {
        console.error(err);
      }
    };

    getAuditData();
    getUserCount();
  }, []);
  


  const COLORS = ["#8884d8", "#82ca9d", "#FF8042"];

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded shadow h-80">
          <h2 className="font-semibold mb-2">Users</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={userData}>
              <XAxis dataKey="id" />
              <YAxis dataKey="dob" />
              <Tooltip />
              <Bar dataKey="dob" fill="#8884d8" />
              <Bar dataKey="role" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 bg-white rounded shadow h-80">
          <h2 className="font-semibold mb-2">Audit Events Over Time</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={auditData}>
              <XAxis dataKey="performedBy" />
              <YAxis dataKey="eventName" />
              <Tooltip />
              <Line type="monotone" dataKey="createdAt" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        
      </div>
    </Layout>
  );
}
