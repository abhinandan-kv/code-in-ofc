import axios from "axios";
import { useEffect, useState } from "react";
import PostDisplay from "./PostDisplay";

const ENDPOINT = "https://dummyjson.com/posts";

const Post = () => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("storedData");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (!localStorage.getItem("storedData")) {
      axios
        .get(ENDPOINT)
        .then((res) => setData(res.data.posts))
        .catch((err) => console.error(err));
    } 
  }, []);

  useEffect(() => {
    localStorage.setItem("storedData", JSON.stringify(data));
  }, [data]);

  const handleDelete = (id) => {
    const updatedPosts = data.filter((post) => post.id !== id);
    setData(updatedPosts);
    localStorage.setItem("storedData", JSON.stringify(updatedPosts));
  };

  console.log("data:- ", data);
  let postArr = data;
  console.log("postArr :-", postArr);

  return (
    <>
      <div className="d-flex gap-4 container-fluid flex-wrap justify-content-center overflow-x-hidden  ">
        {postArr && postArr.length > 0
          ? postArr.map((val, idx) => (
              <PostDisplay key={idx} {...val} onDelete={() => handleDelete(val.id)} />
            ))
          : "Loading..."}
      </div>
    </>
  );
};

export default Post;
