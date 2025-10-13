import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { GiSplitCross } from "react-icons/gi";
import { useCreateProductMutation } from "../app/features/api/apiSlice";

const AddProductForm = ({ isOpen, clickHandler }) => {
  const [createProduct, result] = useCreateProductMutation();
  const [login, { log, product }] = useCreateProductMutation();
  const [post, setPost] = useState({
    title: undefined,
    description: undefined,
  });

  async function handleFormSubmit(e) {
    e.preventDefault();
    await createProduct(post);
  }

  return (
    <>
      {isOpen ? (
        <div>
          <form
            className="max-w-sm mx-auto relative"
            onSubmit={handleFormSubmit}
          >
            <button
              onClick={clickHandler}
              className="text-white right-0 top-0 absolute cursor-pointer"
            >
              <GiSplitCross />
            </button>

            <div className="mb-5">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                type="title"
                id="title"
                value={post.title}
                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                required
              />
              <label
                htmlFor="desc"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <input
                type="desc"
                id="desc"
                value={post.description}
                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                onChange={(e) =>
                  setPost({ ...post, description: e.target.value })
                }
                required
              />
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 cursor-pointer hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add{" "}
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full justify-end flex">
          <button onClick={clickHandler} className="cursor-pointer">
            <IoIosAddCircle className="w-8 h-8 text-white" />
          </button>
        </div>
      )}
    </>
  );
};

export default AddProductForm;
