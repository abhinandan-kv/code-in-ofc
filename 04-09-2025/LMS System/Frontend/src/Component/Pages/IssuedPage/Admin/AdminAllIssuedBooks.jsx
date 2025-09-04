import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import IssueBookLayoutAdmin from "./IssueBookLayoutAdmin";
import AdminLayout from "../../../Layout/AdminLayout";

const AdminAllIssuedBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookform, setBookForm] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:9000/admin/issued/books", { withCredentials: true });

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
      <h1 className="text-4xl mb-3 underline">All Issued Books </h1>

      <div className="flex gap-2 flex-wrap w-full justify-between mt-3">
        {books.map((val, idx) => (
          <IssueBookLayoutAdmin data={val} key={idx} />
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminAllIssuedBooks;
