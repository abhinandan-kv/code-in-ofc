import { useState } from "react";
import Todo from "./Components/TodoMemoEx";
import TodoApp from "./Components/Todo";

const App = () => {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState(["todo 1", "todo 2"]);

  const increment = () => {
    setCount((c) => c + 1);
  };

  return (
    <>
      <Todo todos={todos} />
      <TodoApp />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
      </div>
    </>
  );
};

export default App;
