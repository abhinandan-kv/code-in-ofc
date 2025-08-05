import React, { useState } from "react";

function TodoApp() {
  const [input, setInput] = useState("");
  const [taskArray, setTaskArray] = useState([]);

  function handleClick() {
    console.log(input);
    if (input) {
      setTaskArray([...taskArray, input]);
    }
    setInput("");
    console.log(taskArray);
  }

  return (
    <>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="enter task" />
      <button onClick={handleClick} onKeyDown={handleClick}>Send</button>

    {taskArray.length ? <h3>Your other tasks</h3> : ""}

      {taskArray.map((task, index) => {
        return <><p key={index}>{task}</p><hr/></>;
      })}
    </>
  );
}

export default TodoApp;
