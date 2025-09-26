import React from "react";
import Layout from "../../Layout/LayoutAdmin";
import VendorCard from "./VendorCard";
import VendorLayout from "../../Layout/LayoutVendor";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function VendorList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllVendors = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/admin/getusers`, {
          withCredentials: true,
        });
        console.log(res.data);  
        setUsers(res.data)
      } catch (err) {
        console.error(err);
      }
    };
    getAllVendors();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {users.map((u) => (
          <VendorCard key={u.id} user={u} />
        ))}
      </div>
    </Layout>
  );
}
