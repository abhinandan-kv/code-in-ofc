import React from "react";

const SubjectForm = () => {
  return (
    <form className="max-w-sm mt-0.5 rounded-md bg-pink-400 shadow-lg shadow-gray-500/50 backdrop-blur-md">
      <div className="mb-5 p-2">
        <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Subjects Name (comma seperated)
        </label>
        <input
          type="text"
          id="large-input"
          className="block w-full p-4 text-gray-900 border outline-0 border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
        />
      </div>
    </form>
  );
};

export default SubjectForm;
