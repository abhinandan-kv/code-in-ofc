import React from "react";
import studentLogo from "../../../../../public/student.png";
import { useState } from "react";

const TeacherStudentCard = ({ data }) => {
  const [dropdown, setDropdown] = useState(false);
  console.log(data);

  //handle the option button and open it and show the option to delete, edit detail

  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-4 pt-4">
        <button
          id="dropdownButton"
          data-dropdown-toggle="dropdown"
          className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
          type="button"
          onClick={() => setDropdown(() => true)}
        >
          <span className="sr-only">Open dropdown</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
        </button>
        {dropdown && (
          <div
            id="dropdown"
            className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
          >
            <ul className="py-2" aria-labelledby="dropdownButton">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Edit
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Export Data
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Delete
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center pb-10">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={studentLogo} alt="Bonnie image" />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{data.name}</h5>
        <div>
          <span className="text-sm mr-4 text-gray-500 dark:text-gray-400">
            Percentage: {data.totalPercentage ?? "No data yet"}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Attendence: {data.totalAttendence ?? "No data yet"}</span>
        </div>
        Subjects having data will be shown here. LATER
        <div className="flex mt-4 md:mt-6">
          <a
            href={`mailto:${data.Auth_Table.email}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {data.Auth_Table.email}
          </a>
          <a
            href={`tel:${data.Auth_Table.phoneNumber}`}
            className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            {/* handled later to add number directly on click */}
            {data.Auth_Table.phoneNumber ?? "No. Not Provided"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeacherStudentCard;
