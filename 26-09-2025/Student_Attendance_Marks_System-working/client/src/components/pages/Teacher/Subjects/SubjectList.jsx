import React, { useEffect } from "react";
import TeacherLayout from "../../Layout/TeacherLayout";
import { useState } from "react";
import SubjectForm from "./AddSubjectForm/SubjectForm";
import axios from "axios";

const BASEURL = import.meta.env.VITE_BACKEND_URL;

const SubjectList = () => {
  const [btn, setBtn] = useState(false);
  const [subject, setSubject] = useState([]);

  useEffect(() => {
    async function getSubject() {
      try {
        const result = await axios.get(`${BASEURL}/api/v1/subject/get`, { withCredentials: true });
        console.log(result);
        setSubject(result.data.response);
      } catch (error) {
        console.error(error);
      }
    }
    getSubject();
  }, []);

  return (
    <TeacherLayout>
      <button
        className=" flex items-center gap-1 text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium antialiased rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={(e) => {
          e.preventDefault();
          setBtn(!btn);
        }}
      >
        Add Subject
      </button>

      {btn && <SubjectForm />}

      {/* subject list area */}
      <div className="relative overflow-x-auto mt-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Subject Name
              </th>
              <th scope="col" className="px-6 py-3">
                Student Opt.in
              </th>
              <th scope="col" className="px-6 py-3">
                Average Percentage
              </th>
              <th scope="col" className="px-6 py-3">
                Available from
              </th>
            </tr>
          </thead>
          <tbody>
            {subject.map((val, idx) => (
              <tr key={idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {val.name}
                </th>
                <td className="px-6 py-4">{"feat. coming soon"}</td>
                <td className="px-6 py-4">{"feat. coming soon"}</td>

                <td className="px-6 py-4">{new Date(val.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TeacherLayout>
  );
};

export default SubjectList;
