import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "../features/post/PostSlice";

export default function Posts() {
  const [input, setInput] = useState({ id: Date.now(), name: undefined, paragraph: undefined });

  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();

  console.log(post);

  useEffect(() => {}, [post]);

  return (
    <>
      {/* The values are not showing tbh */}
      {post.map((p) => {
        <div>
          <span>{p.id}</span>
          <h4>{p.name}</h4>
          <p>{p.paragraph}</p>
        </div>;
      })}

      <input type="text" placeholder="Enter Post name" value={input.name} onChange={(e) => setInput((prev) => ({ ...prev, name: e.target.value }))} />
      <input
        type="text"
        placeholder="Enter Post paragraph"
        value={input.paragraph}
        onChange={(e) => setInput((prev) => ({ ...prev, paragraph: e.target.value }))}
      />
      <button onClick={() => dispatch(addNewPost(input))}>Submit</button>
    </>
  );
}
