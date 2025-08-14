import React, { useState } from "react";
import PostDisplay from "./PostDisplay";

const UpdatePost = () => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("storedData");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState({ title: "", body: "", tags: "" });
  const [id, setId] = useState({ postId: "", idStatus: false });
  const [selectedPost, setSelectedPost] = useState(null);
  const [updatedPost, setUpdatedPost] = useState(null);

  function handleId(e) {
    e.preventDefault();
    const post = data.find((p) => p.id === Number(id.postId));
    if (!post) {
      alert("Invalid post id");
      return;
    }
    setSelectedPost(post);
    setInput({
      title: post.title,
      body: post.body,
      tags: post.tags ? post.tags.join(", ") : "",
    });
    setId({ ...id, idStatus: true });
    setUpdatedPost(null); // Reset updated post
  }

  function handleClick(e) {
    e.preventDefault();
    const idx = data.findIndex((post) => post.id === Number(id.postId));
    if (idx === -1) {
      alert("Invalid post id");
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
  }

  return (
    <>
      {!id.idStatus ? (
        <form>
          <input
            placeholder="Post Id to edit"
            value={id.postId}
            onChange={(e) => setId({ ...id, postId: e.target.value })}
            required
          />
          <button onClick={handleId}>Submit Id</button>
        </form>
      ) : (
        <div>
          <p className="m-0 mt-3">Previous Post:</p>
          {selectedPost && <PostDisplay {...selectedPost} />}
          <form>
            <input
              placeholder="title"
              value={input.title}
              onChange={(e) => setInput({ ...input, title: e.target.value })}
              required
            />
            <input
              placeholder="body"
              value={input.body}
              onChange={(e) => setInput({ ...input, body: e.target.value })}
              required
            />
            <input
              placeholder="tags (comma separated)"
              value={input.tags}
              onChange={(e) => setInput({ ...input, tags: e.target.value })}
              required
            />
            <button onClick={handleClick}>Edit</button>
          </form>
          {updatedPost && (
            <>
              <p className="m-0 mt-5">Updated Post:</p>
              <PostDisplay {...updatedPost} />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default UpdatePost;