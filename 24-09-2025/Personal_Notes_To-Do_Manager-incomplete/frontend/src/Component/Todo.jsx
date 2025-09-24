import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allCompleted, colorSelected, completedCleared, statusFilterChanged, todoAdd, todoDeleted, todoToggled } from "../app/features/todoSlice";

const Todo = () => {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  const [todoInput, setTodoInput] = useState();

  console.log(todos);
  const pendingTodo = todos.filter((t) => t.completed !== true);
  console.log(pendingTodo);

  return (
    <>
      <section className="w-screen h-screen bg-amber-50 flex flex-col justify-center items-center">
        <h1 className="text-[200px]">
          ToDo<sub>s</sub>
        </h1>
        <div className="bg-blue-100 min-w-4/5 min-h-1/2">
          <header>
            <input
              className="border-2 min-w-full px-2 placeholder:text-gray-500 placeholder:font-medium"
              placeholder="What needs to be done?"
              onChange={(e) => setTodoInput(e.target.value)}
              value={todoInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") dispatch(todoAdd(todoInput));
              }}
            />
          </header>
          <main className=" min-h-3/5">
            <ul className=" px-2  ">
              {todos.map((t, idx) => (
                <li className="flex justify-between my-1">
                  <input type="checkbox" checked={t.completed} onChange={(e) => dispatch(todoToggled(t))} />
                  <p className="min-w-2/3">{t.text}</p>
                  <select
                    className="outline-none text-sm "
                    onChange={(e) => {
                      const color = e.target.value;
                      dispatch(colorSelected({ ...t, color }));
                    }}
                  >
                    <option value="Green">Green</option>
                    <option value="Blue">Blue</option>
                    <option value="Orange">Orange</option>
                    <option value="Purple">Purple</option>
                    <option value="Red">Red</option>
                  </select>
                  <button className="cursor-pointer" onClick={(e) => dispatch(todoDeleted(t))}>
                    ❌
                  </button>
                </li>
              ))}
            </ul>
          </main>
          <footer className="flex  gap-5 justify-between px-2 border-t-1 border-t-cyan-500 ">
            <div className="flex flex-col gap-2">
              <span className="justify-center flex">Actions</span>
              <button className="bg-blue-400 border-1 rounded-sm p-1 text-sm" onClick={(e) => dispatch(allCompleted())}>
                Mark All Completed
              </button>
              <button className="bg-blue-400 border-1 rounded-sm p-1 text-sm" onClick={(e) => dispatch(completedCleared())}>
                Clear Completed
              </button>
            </div>
            <div className="flex flex-col">
              <span>Remaining Todos</span>
              <p className="text-sm text-center mt-2">{pendingTodo.length}</p>
            </div>
            <div className="flex flex-col">
              <span>Filter by status</span>
              <button className="text-sm" onClick={(e)=> dispatch(statusFilterChanged('all'))}>All</button>
              <button className="text-sm" onClick={(e)=> dispatch(statusFilterChanged('active'))}>Active</button>
              <button className="text-sm" onClick={(e)=> dispatch(statusFilterChanged('completed'))}>Completed</button>
            </div>
            <div className="flex flex-col">
              <span>Filter By Color</span>
              <div className="gap-2 flex items-center">
                <input type="checkbox" id="green" />
                <span className="bg-green-400 w-4 h-4"> </span>
                <label htmlFor="green" className="text-sm">
                  Green
                </label>
              </div>
              <div className="gap-2 flex">
                <input type="checkbox" id="blue" />
                <span className="bg-blue-400 w-4 h-4"> </span>
                <label htmlFor="blue" className="text-sm">
                  Blue
                </label>
              </div>
              <div className="gap-2 flex">
                <input type="checkbox" id="orange" />
                <span className="bg-orange-400 w-4 h-4"> </span>
                <label htmlFor="orange" className="text-sm">
                  Orange
                </label>
              </div>
              <div className="gap-2 flex">
                <input type="checkbox" id="purple" />
                <span className="bg-purple-400 w-4 h-4"> </span>
                <label htmlFor="purple" className="text-sm">
                  Purple
                </label>
              </div>
              <div className="gap-2 flex">
                <input type="checkbox" id="red" />
                <span className="bg-red-400 w-4 h-4"> </span>
                <label htmlFor="red" className="text-sm">
                  Red
                </label>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </>
  );
};

export default Todo;
