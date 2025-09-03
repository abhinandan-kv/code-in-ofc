import React, { useEffect } from "react";
import bookimg from "../../../../assets/bookimg.jpg";
import axios from "axios";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { toast } from "sonner";

const IssueBookLayoutDesignUser = ({ data }) => {
  //   console.log(data);

  const [dueDateFormatted, setDueDateFormatted] = useState(null);

  useEffect(() => {
    const dueDate = data.dueDate;
    const dueDateFormat = new Date(dueDate);
    setDueDateFormatted(dueDateFormat.toDateString());
  }, []);

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
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Publication: {data.bookPublicationName}</p>
          <div className="flex justify-between">
            <p className="mb-3 font-normal text-sm text-gray-700 dark:text-gray-400">Issued On: {data.issueDate}</p>
            <p className="mb-3 font-normal text-sm text-gray-700 dark:text-gray-400">Due Date: {dueDateFormatted}</p>
          </div>
          <button
            type="button"
            disabled
            className="text-white w-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            {data.returned ? "Returned" : "Yet To Return"}
          </button>
        </div>
      </div>
    </>
  );
};

export default IssueBookLayoutDesignUser;
