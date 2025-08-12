import { useState } from "react";
import Child1 from "./child1";

const Parent1 = () => {
  const [input, setInput] = useState("");
  const [flag, setFlag] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    // setInput(e.target.value)
    setFlag(true);
  };

  return (
    <>
      <div>
        <span>Parent to Child passing demo</span>
        <hr></hr>
        <form action="submit">
          <label htmlFor="input">Enter Color name</label>
          <input value={input} onChange={(e) => setInput(e.target.value)} id="input" />
          <button type="submit" onClick={handleClick}>
            Submit
          </button>
        </form>
      </div>
      <div>{flag ? <Child1 backgroundColor={input} /> : ""}</div>
    </>
  );
};

export default Parent1;
