//call the todolist here - child component

import React, { useState } from "react";

const Todo = ({ onAdd }) => {
  const [input, setInput] = useState({ text: "", completed: false, date: "" });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setInput((prev) => ({
      ...prev,
      [id === "input-chk-box" ? "completed" : id.replace("input-", "")]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.text && input.date) {
      onAdd(input);
      setInput({ text: "", completed: false, date: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" id="input-text" value={input.text} onChange={handleChange} placeholder="Todo" required />
      <input type="checkbox" id="input-chk-box" checked={input.completed} onChange={handleChange} />
      <input type="date" id="input-date" value={input.date} onChange={handleChange} required />
      <button type="submit">Add</button>
    </form>
  );
};

export default Todo;
