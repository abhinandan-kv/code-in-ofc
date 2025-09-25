import React from "react";
import { Link } from "react-router-dom";
import profilePic from "../../../assets/image.png"

export default function VendorCard({ user }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center">
      <img
        src={profilePic}
        alt={user.name}
        className="w-24 h-24 rounded-full object-cover mb-4"
      />

      <h2 className="text-lg font-bold mb-1">{user.name}</h2>
      <p className="text-sm text-gray-600 mb-1">{user.email}</p>
      <p className="text-sm text-gray-600 mb-3">Role: {user.role}</p>

      <Link
        to={`/vendor/${user.id}`}
        className="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        View Details
      </Link>
    </div>
  );
}
