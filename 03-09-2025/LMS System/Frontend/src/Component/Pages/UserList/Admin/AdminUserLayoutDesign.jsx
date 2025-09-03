import React from "react";
import bookimg from "../../../../assets/profilepic.jpg";
import axios from "axios";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { toast } from "sonner";

const AdminUserLayoutDesign = ({ data }) => {
  //   const [updateBookForm, setUpdateBookForm] = useState(false);

  console.log(data);

  //   async function handleUpdateClick(evt) {
  //     evt.preventDefault();
  //     // console.log(evt);
  //     // console.log(evt.target.id);
  //     //     const bookid = evt.target.id;
  //     //     const getBookDataById = await axios.post("http://localhost:9000/admin/listone", {bookid}, { withCredentials: true });

  //     //     console.log(getBookDataById);
  //     //     setBookData({bookName: null, authorName: null, publicationName: null, publicationYear: null, availability: null})

  //     setUpdateBookForm(true);
  //   }

  //   function handleUpdateFormClose() {
  //     setUpdateBookForm(false);
  //   }

  async function handleDeleteClick(evt) {
    evt.preventDefault();
    const confirm = window.confirm("Are you sure want to delete?");
    console.log(confirm);
    let id = data.id;

    if (confirm) {
      const result = await axios.delete(`http://localhost:9000/admin/delete/user/${id}`, { withCredentials: true });
      //   console.log(result);
      if (result.status) {
        toast("User Successfully deleted");
      } else {
        toast("Error Occurred");
      }
    }
  }

  return (
    <>
      {/* {updateBookForm && (
        <div className="fixed inset-0 flex items-center justify-center  backdrop-blur-3xl bg-opacity-40 z-50">
          <div className="bg-gray-300 rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button onClick={() => setUpdateBookForm(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 mb-2">
              <RxCross1 />
            </button>
            <UpdateForm data={data} formClose={handleUpdateFormClose} />
          </div>
        </div>
      )} */}

      <div className="max-w-sm  bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img className="rounded-t-lg" src={bookimg} alt="" />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.name}</h5>
          </a>
          <div className="flex justify-between">
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Email: {data.email}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Contact: {data.phoneNumber}</p>
          </div>{" "}
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Address: {data.address}</p>
          {/* only for admin */}
          <div className="flex justify-between">
            <p className="mb-3 text-xs font-light  text-gray-700 dark:text-gray-400">{data.references}</p>
            {/* <p className="mb-3 text-xs font-light  text-gray-700 dark:text-gray-400">
          {data.createdAt.toLocaleString()}
        </p> */}
            {data.deletedAt ? <p className="mb-3 text-xs font-light  text-red-700 dark:text-red-400">Deleted: TRUE</p> : ""}
          </div>
          {/* //  attach id to handle this */}
          <div className="justify-between flex sm:flex-row  flex-col">
            {/* <a
              id={data.id}
              href={data.id}
              onClick={handleUpdateClick}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update
            </a> */}
            <a
              id={data.id}
              href={data.id}
              onClick={handleDeleteClick}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Delete
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUserLayoutDesign;
