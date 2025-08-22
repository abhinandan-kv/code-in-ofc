import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../Layout/LayoutAdmin";

export default function UserPage() {
  const { id } = useParams();

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phoneNumber: "1234567890",
      dob: "1995-06-15",
      role: "user",
      isActive: true,
      approvedBy: "Admin Jane",
      profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Sarah Connor",
      email: "sarah@example.com",
      phoneNumber: "9876543210",
      dob: "1990-03-22",
      role: "vendor",
      isActive: false,
      approvedBy: "Yet to Approve",
      profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ];

  const user = users.find((u) => u.id === Number(id));
  if (!user) return <Layout><p>User not found</p></Layout>;

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0">
          <img
            src={user.profilePic}
            alt={user.name}
            className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
          <p className="text-gray-600 mb-2"><strong>Email:</strong> {user.email}</p>
          <p className="text-gray-600 mb-2"><strong>Phone:</strong> {user.phoneNumber}</p>
          <p className="text-gray-600 mb-2"><strong>DOB:</strong> {user.dob}</p>
          <p className="text-gray-600 mb-2"><strong>Role:</strong> {user.role}</p>
          <p className="text-gray-600 mb-2"><strong>Status:</strong> {user.isActive ? "Active ✅" : "Inactive ❌"}</p>
          <p className="text-gray-600 mb-2"><strong>Approved By:</strong> {user.approvedBy}</p>
        </div>
      </div>
    </Layout>
  );
}
