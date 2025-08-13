//call the todolist here - child component

import React from "react";

const Todo = () => {
  return (
    <>
      <form>
        <label htmlFor="input-txt"></label>
        <input type="text" id="input-txt" />
        <label htmlFor="input-chk-box"></label>
        <input type="checkbox" id="input-chk-box" />
        <label htmlFor="input-date"></label>
        <input type="date" id="input-date" />
      </form>
    </>
  );
};

export default Todo;
