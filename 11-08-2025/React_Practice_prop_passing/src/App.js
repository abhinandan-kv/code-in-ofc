import logo from "./logo.svg";
import "./App.css";
import Parent1 from "./component/Parent_Child_Rel._Componets/parent1";
import Parent2 from "./component/Parent_Child_Rel._Componets/parent2";
import Parent3 from "./component/Parent_Child_Rel._Componets/parent3";
import Parent4 from "./component/Parent_Child_Rel._Componets/parent4";
import TodoList from "./component/Todo/TodoList";
import { useState } from "react";

function App() {
  const [tab, setTab] = useState("all");
  const [isDark, setIsDark] = useState(false);
  return (
    <div className="App">
      <Parent1 />
      <Parent2 />
      <Parent3 />
      <Parent4 />

      <button onClick={() => setTab("all")}>All</button>
      <button onClick={() => setTab("active")}>Active</button>
      <button onClick={() => setTab("completed")}>Completed</button>
      <br />
      <label>
        <input type="checkbox" checked={isDark} onChange={(e) => setIsDark(e.target.checked)} />
        Dark mode
      </label>
      <hr />
      <TodoList todos={todos} tab={tab} />
    </div>
  );
}

export default App;
