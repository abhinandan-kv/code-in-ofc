//handle logics save list and cruds- this is parent component


import React, { useState } from 'react'
import Todo from './Todo'

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const addTodo = (todo) => {
    const updated = [...todos, todo];
    setTodos(updated);
    localStorage.setItem("todos", JSON.stringify(updated));
  };

  const deleteTodo = (idx) => {
    const updated = todos.filter((_, i) => i !== idx);
    setTodos(updated);
    localStorage.setItem("todos", JSON.stringify(updated));
  };

  return (
    <div>
      <Todo onAdd={addTodo} />
      <ul>
        {todos.map((todo, idx) => (
          <li key={idx}>
            {todo.text} | {todo.completed ? "Done" : "Pending"} | {todo.date}
            <button onClick={() => deleteTodo(idx)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoList


