import React, { useEffect, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, notesAdd, notesDelete } from "../app/features/noteSlice";
import axios from "axios";
import { toast } from "sonner";

const BASEURL = import.meta.env.VITE_BACKEND_URL;

const Note = () => {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();
  const { notes, status, error } = useSelector((state) => state.note);
  console.log(notes);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  async function handleNoteAdd(data) {
    try {
      const payload = {
        text: data,
      };
      const res = await axios.post(`${BASEURL}/api/v1/note/post`, { payload }, { withCredentials: true });

      console.log(res);
      if (res.status === 200) {
        toast(res.data.message);
      } else {
        toast("Error Occured");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleNoteDelete(noteid) {
    try {
      dispatch(notesDelete(noteid));
      const res = await axios.delete(`${BASEURL}/api/v1/note/delete/${noteid}`, { withCredentials: true });

      console.log(res);
      if (res.status === 200) {
        toast(res.data.message);
      } else {
        toast("Error Occured");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="h-screen w-screen p-4">
      <label htmlFor="voice-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 21 21"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="voice-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Note down important stuff..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              dispatch(notesAdd(input));
              setInput("");
              handleNoteAdd(input);
            }
          }}
          required
        />
        <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-wrap mt-3 gap-2">
        {notes.map((val, idx) => (
          <Card data={val} key={idx} onClickHandler={handleNoteDelete} />
        ))}
      </div>
    </div>
  );
};

export default Note;

function Card({ data, onClickHandler }) {
  console.log(data);
  const id = data.id;
  return (
    <div className="relative">
      <div
        href="#"
        className="block  p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 "
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"></h5>
        <p className="font-normal text-gray-600 dark:text-gray-400">{data.text}</p>
        <RxCrossCircled
          className="absolute top-0 right-0 text-red-500 text-2xl hover:text-red-800 cursor-pointer"
          onClick={()=>onClickHandler(id)}
        />
      </div>
    </div>
  );
}
