import React from "react";
import TeacherLayout from "../../Layout/TeacherLayout";
import { useState } from "react";
import SubjectForm from "./AddSubjectForm/SubjectForm";

const SubjectList = () => {
  const [btn, setBtn] = useState(false);

  return (
    <TeacherLayout>
      <button
        className=" flex items-center gap-1 text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium antialiased rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => setBtn(!btn)}
      >
        Add Subject
      </button>

      {btn && <SubjectForm />}
    </TeacherLayout>
  );
};

export default SubjectList;
