import React from "react";
import bookimg from "../../../../assets/bookimg.jpg";
import axios from "axios";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { toast } from "sonner";

const BookLayoutUserDesign = ({ data }) => {
  //   console.log(data);

  const [issue, setIssue] = useState(false);

  async function handleIssueClick(evt) {
    evt.preventDefault();

    try {
      const confirm = window.confirm(`Are you sure you want to issue `);

      if (confirm) {
        const bookId = evt.target.id;
        const result = await axios.post(`http://localhost:9000/user/issuebook/${bookId}`, {}, { withCredentials: true });

        if (result.status) {
          toast(result.data.message);
          setIssue(true);
        }
      }
    } catch (err) {
      console.error(err);
      toast(err.message);
    }
  }

  return (
    <>
      <div className="max-w-sm  bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img className="rounded-t-lg" src={bookimg} alt="" />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.bookName}</h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">By: {data.authorName}</p>
          <div className="flex justify-between">
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Publication: {data.publicationName}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Year: {data.publicationYear}</p>
          </div>

          {/* //  attach id to handle this */}
          <div className="justify-end flex sm:flex-row  flex-col">
            <a
              id={data.id}
              href={data.id}
              onClick={handleIssueClick}
              style={{ pointerEvents: issue ? "none" : "auto" }}
              className={
                issue
                  ? "inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  : "inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              }
            >
              {issue ? "Issued" : "Issue"}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookLayoutUserDesign;
