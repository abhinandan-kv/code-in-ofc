import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import UserLayout from "../../../Layout/UserLayout";
import IssueBookLayoutDesignUser from "./IssueBookLayoutDesignUser";

const UserIssuedBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookform, setBookForm] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:9000/user/book/currentissued", { withCredentials: true });

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
    <UserLayout>
      {/* //call this recursively */}
      <h1 className="text-4xl mb-3 underline">All Issued Books</h1>

      <div className="flex gap-2 flex-wrap w-full justify-between mt-3">
        {books.map((val, idx) => (
          <IssueBookLayoutDesignUser data={val} key={idx} />
        ))}
      </div>
    </UserLayout>
  );
};

export default UserIssuedBooks;
