import React, { useState } from "react";
import PostDisplay from "./PostDisplay";

const UpdatePost = () => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("storedData");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState({ title: "", body: "", tags: "" });
  const [id, setId] = useState({ postId: "", idStatus: false });
  const [updatedPost, setUpdatedPost] = useState(null);
  const [updated, setUpdated] = useState(false);

  function updatePost(index) {
    try {
      const idx = Number(index);
      if (idx < 0 || idx >= data.length) {
        alert("Invalid post index");
        return;
      }

      const updatedData = [...data];
      updatedData[idx] = {
        ...updatedData[idx],
        title: input.title,
        body: input.body,
        tags: input.tags.split(",").map((tag) => tag.trim()),
      };

      setData(updatedData);
      localStorage.setItem("storedData", JSON.stringify(updatedData));

      setUpdatedPost(updatedData[idx]);
      setUpdated(true);
    } catch (err) {
      console.error(err);
    }
  }

  function handleClick(e) {
    e.preventDefault();
    updatePost(id.postId);
  }

  function handleId(e) {
    e.preventDefault();
    setId({ ...id, idStatus: true });
  }

  return (
    <>
      {!id.idStatus ? (
        <form>
          <input placeholder="Post Index to edit" value={id.postId} onChange={(e) => setId({ ...id, postId: e.target.value })} required />
          <button onClick={handleId}>Submit Id</button>
        </form>
      ) : (
        <div>
          <form>
            <input placeholder="title" value={input.title} onChange={(e) => setInput({ ...input, title: e.target.value })} required />
            <input placeholder="body" value={input.body} onChange={(e) => setInput({ ...input, body: e.target.value })} required />
            <input placeholder="tags (comma separated)" value={input.tags} onChange={(e) => setInput({ ...input, tags: e.target.value })} required />
            <button onClick={handleClick}>Edit</button>
          </form>

          <p className="m-0 mt-5">Updated Post:</p>
          {updatedPost && <PostDisplay {...updatedPost} />}
          {/* {updated?<PostDisplay {...updatedPost}/>:<PostDisplay {...data[id.idx]} />} */}
        </div>
      )}
    </>
  );
};

export default UpdatePost;
