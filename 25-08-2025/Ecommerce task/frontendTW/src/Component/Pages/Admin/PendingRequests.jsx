import React, { useState, useEffect } from "react";
import Layout from "../../Layout/LayoutAdmin";
import axios from "axios";

export default function PendingRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/admin/pendingreq`, {
          withCredentials: true,
        });
        console.log(res.data);

        setRequests(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getRequests();
  }, []);

  //   console.log()

  const handleApprove = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:9000/admin/patch/${id}`, {}, { withCredentials: true });
      // console.log(res);

      const newRes = await axios.get(`http://localhost:9000/admin/pendingreq`, {
        withCredentials: true,
      });

      setRequests(newRes.data);
      alert(`User ${res.data.newData.name} approved `);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeny = async (id) => {
    // deny means directly delete the user.
    try {
      const res = await axios.delete(`http://localhost:9000/admin/delete/${id}`, { withCredentials: true });
      setRequests((prev) => prev.filter((u) => u.id !== id));
      alert(`User ${id} denied and deleted `);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Pending Requests</h1>

      {requests.length === 0 ? (
        <p className="text-gray-600">No pending requests </p>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>

                  <td className="px-6 py-4 whitespace-nowrap">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                    <button onClick={() => handleApprove(user.id)} className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                      Approve
                    </button>
                    <button onClick={() => handleDeny(user.id)} className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                      Deny
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}
