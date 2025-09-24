import React from "react";
import TeacherLayout from "../../Layout/TeacherLayout";
import TeacherStudentCard from "./TeacherStudentCard";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";

const BASEURL = import.meta.env.VITE_BACKEND_URL;

const TeacherStudentList = () => {
  const [student, setStudent] = useState([]);

  useEffect(() => {
    async function getStudentList() {
      try {
        const result = await axios.get(`${BASEURL}/api/v1/student/list`, { withCredentials: true });
        // console.log(result);
        setStudent(result.data.response);
      } catch (error) {
        console.error(error);
      }
    }
    getStudentList();
  }, []);
  console.log(student);
  return (
    <TeacherLayout>
      <div className="flex justify-end text-gray-900 font-light">
        {/* this button feature is out pf scope of this project */}
        <button className=" flex items-center gap-1 text-white bg-fuchsia-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-extralight antialiased rounded-lg text-sm px-4 py-2 text-center dark:bg-fuchsia-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <span>Add New Student</span>
          <FaPlus />
        </button>
      </div>
      <div className="w-full grid grid-cols-3 gap-2">
        {student.map((val, idx) => (
          <TeacherStudentCard data={val} key={idx} />
        ))}
      </div>
    </TeacherLayout>
  );
};

export default TeacherStudentList;
