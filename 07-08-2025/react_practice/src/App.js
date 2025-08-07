import { useEffect, useState } from "react";
import Child from "./Components/childComponent";
import MouseEvent from "./Components/mouseEvent";
import "./App.css";
import LongSection from "./Components/longSection";
import Box from "./Components/box";
import { Routes } from "react-router-dom";

function App() {
  const [input, setInput] = useState("");
  const [date, setDate] = useState("");
  const [flag, setFlag] = useState(false); // can also use only 1 state :)

  function handleChange(e) {
    e.preventDefault();
    // console.log(input, date);
    setFlag(true);
  }

  return (
    <>
      <form onSubmit={handleChange}>
        <label htmlFor="input">Name:-</label>
        <input type="text" value={input} id="input" onChange={(e) => setInput(e.target.value)} required />
        <label htmlFor="dob">Date of Birth :-</label>
        <input type="date" value={date} id="dob" onChange={(e) => setDate(e.target.value)} required />

        <button type="submit">Send</button>
      </form>
      {flag ? <Child input={input} date={date} /> : ""}



      {/* Commented because its out of scope of this task */}
      {/* <MouseEvent />  */}
    </>
  );
}

export default App;
