import { useState } from "react";
import PostDisplay from "./PostDisplay";

const CreatePost = () => {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("storedData");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState({ id: data.length+1, title: null, body: null, tags: null, userId: null, views: 1, reactions: { likes: 1, dislikes: 0 } });
  const [success, setSuccess] = useState(false)

  const addNewPost = (input) => {
    try{
        setData((data) => [...data, input]);
        console.log("data updated:-", data);
        setSuccess(true)
        if(success){
            localStorage.setItem('storedData', JSON.stringify(data))
        }
    }
    catch(err){
        console.error(err)
    }
  };

  function handleClick(e) {
    e.preventDefault();
    setInput(input);
    addNewPost(input);
    console.log("input:-",input)
  }

  return (
    <>
      <form>
        <input placeholder="title" value={input.title} onChange={(e) => setInput({ ...input, title: e.target.value })} required />
        <input placeholder="body" value={input.body} onChange={(e) => setInput({ ...input, body: e.target.value })} required />

        {/* //should be array of strings */}
        <input placeholder="tags(comma seperated)" value={input.tags || ''} onChange={(e) => setInput({ ...input, tags: e.target.value.split(',').map(tag => tag.trim()) })} required />

        <input placeholder="userId" value={input.userId} onChange={(e) => setInput({ ...input, userId: e.target.value })} required />

        {/* keep views and reactions auto handled */}
        <button onClick={handleClick}>Post</button>
      </form>
      {success?<PostDisplay {...input}/>:''}
    </>
  );
};

export default CreatePost;
