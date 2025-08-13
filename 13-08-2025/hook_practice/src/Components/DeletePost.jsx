import React, { useState } from "react";
import PostDisplay from "./PostDisplay";

const DeletePost = () => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("storedData");
    return saved ? JSON.parse(saved) : {};
  });
  const [id, setId] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [deletedArr, setDeletedArr] = useState({});

  function DeletePostById(idToDel) {
    // console.log(idToDel)
    const post = data;
    let newArr;
    try {
      newArr = post.filter((idx) => idx.id != idToDel);
      setDeletedArr(post[idToDel]);
      setDeleted(true);
      console.log("deleted arr", deletedArr.id);
    } catch (err) {
      console.error(err);
    }
    console.log(post);

    console.log(newArr);
    setData(data);

    localStorage.setItem("storedData", JSON.stringify(newArr));
  }
  function handleClick(e) {
    e.preventDefault();
    // console.log(data);
    DeletePostById(id);
    // console.log(id);
  }

  return (
    <div>
      <form>
        <input placeholder="enter id of post to delete" value={id} onChange={(e) => setId(e.target.value)} />
        <button onClick={handleClick}>Delete</button>
      </form>
      {deleted ? (
        <div>
          <PostDisplay {...deletedArr} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default DeletePost;
