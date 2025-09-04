import React from "react";
import AdminLayout from "../../../Layout/AdminLayout";
import BookLayoutDesign from "./BookLayoutDesign";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import NewBookForm from "./NewBookForm";
import { RxCross1 } from "react-icons/rx";

const AdminBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookform, setBookForm] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:9000/admin/listbook", { withCredentials: true });

        // console.log(res);
        setBooks(res.data.response);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [bookform]);

  function handleAddNewBook() {
    setBookForm(true);
  }

  function handleFormClose(){
    setBookForm(false)
  }

  // console.log(books);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <AdminLayout>
      <div className="flex justify-between">
        <h1 className="text-4xl mb-3 underline">All Books</h1>
        <a
          onClick={handleAddNewBook}
          className="inline-flex items-center px-3  text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add New Book
        </a>
      </div>

      {bookform && (
        <div className="fixed inset-0 flex items-center justify-center  backdrop-blur-3xl bg-opacity-40 z-50">
          <div className="bg-gray-300 rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button onClick={() => setBookForm(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 mb-2">
              <RxCross1 />
            </button>
            <NewBookForm formClose={handleFormClose} />
          </div>
        </div>
      )}

      {/* //call this recursively */}
      <div className="flex gap-2 flex-wrap w-full justify-between mt-3">
        {books.map((val, idx) => (
          <BookLayoutDesign data={val} key={idx} />
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminBooks;
