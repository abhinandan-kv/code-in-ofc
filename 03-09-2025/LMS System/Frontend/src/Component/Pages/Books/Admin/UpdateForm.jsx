import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

const UpdateForm = ({ data, formClose }) => {
  //   const [bookData, setBookData] = useState({
  //     bookName: data.bookName,
  //     authorName: data.authorName,
  //     publicationName: data.publicationName,
  //     publicationYear: data.publicationYear,
  //     availability: data.availability,
  //   });
  const [bookData, setBookData] = useState({
    bookName: null,
    authorName: null,
    publicationName: null,
    publicationYear: null,
    availability: null,
  });

  console.log(data);

  async function handleSubmit(evt) {
    evt.preventDefault();
    // console.log(JSON.stringify(bookData));
    // const parsedData = JSON.stringify(bookData);

    const addNewBook = await axios.patch(`http://localhost:9000/admin/updatebook/${data.id}`, { ...bookData }, { withCredentials: true });

    console.log(addNewBook);

    if (addNewBook.status == 200) {
      toast("Book Updated Successfully");
      formClose();
    }
  }

  return (
    <form className="max-w-md mx-auto">
      <h5 className="mb-6 text-lg font-normal text-gray-900 lg:text-xl   dark:text-gray-400 underline underline-offset-2 ">Update Book</h5>
      <div className="relative z-0 w-full mb-5 group">
        <input
          onChange={(e) => setBookData({ ...bookData, bookName: e.target.value })}
          value={bookData.bookName}
          type="text"
          name="floating_bookName"
          id="floating_bookName"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_bookName"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Book Name
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          onChange={(e) => setBookData({ ...bookData, authorName: e.target.value })}
          value={bookData.authorName}
          type="text"
          name="floating_authorName"
          id="floating_authorName"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_authorName"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Author Name
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          onChange={(e) => setBookData({ ...bookData, publicationName: e.target.value })}
          value={bookData.publicationName}
          type="text"
          name="floating_publicationName"
          id="floating_publicationName"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_publicationName"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Publication Name
        </label>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={(e) => setBookData({ ...bookData, publicationYear: e.target.value })}
            value={bookData.publicationYear}
            type="text"
            name="floating_publicationYear"
            id="floating_publicationYear"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_publicationYear"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Publication Year
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={(e) => setBookData({ ...bookData, availability: e.target.value })}
            value={bookData.availability}
            type="text"
            name="floating_availability"
            id="floating_availability"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_availability"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Availability
          </label>
        </div>
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        className="text-white   bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default UpdateForm;
