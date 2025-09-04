import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import AdminLayout from "../../../../Layout/AdminLayout";
import IssueBookHistoryAdmin from "./IssueBookHistoryAdmin";

const AdminIssueBookHistory = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookform, setBookForm] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:9000/admin/issued/book/history", { withCredentials: true });

        console.log(res);
        setBooks(res.data.response);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [bookform]);

  console.log(books);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <AdminLayout>
      {/* //call this recursively */}
      <h1 className="text-4xl mb-3 underline">All Issued Books History</h1>

      <div className="flex gap-2 flex-wrap w-full justify-between mt-3">
        {books.map((val, idx) => (
          <IssueBookHistoryAdmin data={val} key={idx} />
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminIssueBookHistory;
