import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../Layout/LayoutAdmin";
import VendorLayout from "../../Layout/LayoutVendor";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function VendorPage() {
  const { id } = useParams();
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getAllVendors = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/admin/getuser/${id}`, { //params needed here
          withCredentials: true,
        });
        console.log(res.data)
        setUser(res.data)
      } catch (err) {
        console.error(err);
      }
    };
    getAllVendors()
  }, []);

  if (user.length ==0)
    return (
      <Layout>
        <p>User not found</p>
      </Layout>
    );

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          <img src={user.profilePic} alt={user.name} className="w-40 h-40 rounded-full object-cover border-4 border-blue-500" />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
          <p className="text-gray-600 mb-2">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Phone:</strong> {user.phoneNumber}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>DOB:</strong> {user.dob}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Role:</strong> {user.role}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Status:</strong> {user.isActive ? "Active ✅" : "Inactive ❌"}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Created At:</strong> {user.createdAt}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Approved By:</strong> {user.approvedBy}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>References:</strong> {!user.references? "No references yet!":user.references }
          </p>
        </div>
      </div>
    </Layout>
  );
}
