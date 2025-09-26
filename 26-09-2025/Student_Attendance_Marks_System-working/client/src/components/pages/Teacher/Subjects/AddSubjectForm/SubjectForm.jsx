import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";

const BASEURL = import.meta.env.VITE_BACKEND_URL;

const SubjectForm = () => {
  const [input, setInput] = useState();

  async function handleClick(e) {
    e.preventDefault();
    try {
      const cleanedInput = input.trim().split(",");
      const filterInput = cleanedInput.map((val) => val.trim()).filter((val) => val !== "");
      console.log(filterInput);
      const payload = {
        subject: filterInput,
      };
      const result = await axios.post(`${BASEURL}/api/v1/subject/post`, { payload }, { withCredentials: true });
      console.log(result);
      toast("Subject added Successfully");
      setInput("");
    } catch (error) {
      console.error(error);
      toast("Error Occurred");
    }
  }

  return (
    <form className="max-w-xl mt-0.5 rounded-md bg-slate-500 shadow-lg shadow-gray-500/50 backdrop-blur-md">
      <div className="mb-2 p-2">
        <label htmlFor="large-input" className="block pb-1 text-sm font-medium underline text-gray-900 dark:text-white">
          Subjects Name (comma seperated)
        </label>
        <input
          type="text"
          id="large-input"
          className="block w-full p-4 text-gray-900 border outline-0 border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
          value={input}
          onChange={(e) => {
            e.preventDefault();
            setInput(e.target.value);
          }}
        />
        <button
          className="mt-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={handleClick}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default SubjectForm;
