import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../Layout/LayoutAdmin";

export default function AdminAuditPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get("http://localhost:9000/admin/audit/read", {
          withCredentials: true,
        });
        console.log(res)
        setLogs(res.data.gettingAllLogs); 
      } catch (err) {
        console.error(err);
        setError("Failed to load audit logs");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const totalPages = Math.ceil(logs.length / limit);
  const startIndex = (currentPage - 1) * limit;
  const currentLogs = logs.slice(startIndex, startIndex + limit);

  if (loading)
    return (
      <Layout>
        <p>Loading audit logs...</p>
      </Layout>
    );

  if (error)
    return (
      <Layout>
        <p className="text-red-500">{error}</p>
      </Layout>
    );

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Admin Audit Logs</h1>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded shadow">
        <table className="min-w-full border border-gray-200 dark:border-gray-700 dark:text-white">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="py-2 px-4 border-b text-left">#</th>
              <th className="py-2 px-4 border-b text-left">Performed By</th>
              <th className="py-2 px-4 border-b text-left">Event Name</th>
              <th className="py-2 px-4 border-b text-left">Event Description</th>
              <th className="py-2 px-4 border-b text-left">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {currentLogs.map((log, idx) => (
              <tr
                key={log.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="py-2 px-4 border-b">
                  {startIndex + idx + 1}
                </td>
                <td className="py-2 px-4 border-b">{log.performedBy}</td>
                <td className="py-2 px-4 border-b">{log.eventName}</td>
                <td className="py-2 px-4 border-b">{log.eventDescription}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(log.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center space-x-2 mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-600 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </Layout>
  );
}
