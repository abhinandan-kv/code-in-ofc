import { useEffect, useState } from "react";
import PostDisplay from "./PostDisplay";


const CreatePost = () => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("storedData");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState({ title: "", body: "", tags: "", userId: "", views: 1, reactions: { likes: 1, dislikes: 0 } });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem('storedData', JSON.stringify(data));
  }, [data]);

  const addNewPost = () => {
    const newPost = {
      ...input,
      id: data.length ? data[data.length - 1].id + 1 : 1,
      tags: input.tags.split(',').map(tag => tag.trim()),
    };
    setData([...data, newPost]);
    setSuccess(true);
  };

  function handleClick(e) {
    e.preventDefault();
    addNewPost();
  }

  return (
    <>
      <form>
        <input placeholder="title" value={input.title} onChange={(e) => setInput({ ...input, title: e.target.value })} required />
        <input placeholder="body" value={input.body} onChange={(e) => setInput({ ...input, body: e.target.value })} required />
        <input placeholder="tags(comma separated)" value={input.tags} onChange={(e) => setInput({ ...input, tags: e.target.value })} required />
        <input placeholder="userId" value={input.userId} onChange={(e) => setInput({ ...input, userId: e.target.value })} required />
        <button onClick={handleClick}>Post</button>
      </form>
      {success ? <PostDisplay {...data[data.length - 1]} /> : ''}

      
    </>
  );
};

export default CreatePost;