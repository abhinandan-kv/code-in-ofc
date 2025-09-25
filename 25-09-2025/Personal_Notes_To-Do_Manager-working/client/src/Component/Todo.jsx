import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allCompleted,
  colorSelected,
  completedCleared,
  fetchTodo,
  statusFilterChanged,
  todoAdd,
  todoDeleted,
  todoToggled,
} from "../app/features/todoSlice";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

const BASEURL = import.meta.env.VITE_BACKEND_URL;

const Todo = () => {
  const [pending, setPending] = useState([]);
  const [filter, setFilter] = useState("all");
  const [filterColor, setFilterColor] = useState("");

  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  const [todoInput, setTodoInput] = useState();

  console.log(todos);

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  useEffect(() => {
    if (filter == "completed") {
      const todoFilter = todos.filter((t) => t.completed);
      setPending(todoFilter);
    } else if (filter == "active") {
      const todoFilter = todos.filter((t) => !t.completed);
      setPending(todoFilter);
    } else {
      setPending(todos);
    }
  }, [filter, todos]);

  async function handleAddNewTask() {
    try {
      const payload = {
        text: todoInput,
        completed: false,
      };
      console.log(payload);
      const res = await axios.post(`${BASEURL}/api/v1/todo/post`, { payload: payload }, { withCredentials: true });
      console.log(res);
      if (res.status === 200) {
        toast(res.data.message);
      } else {
        toast("Error Occured");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteTask(todoId) {
    try {
      const res = await axios.delete(`${BASEURL}/api/v1/todo/delete/${todoId}`, { withCredentials: true });
      console.log(res);
      if (res.status === 200) {
        toast(res.data.message);
      } else {
        toast("Error Occured");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleMarkCompleteTask(todoId) {
    try {
      const res = await axios.patch(`${BASEURL}/api/v1/todo/mark/${todoId}`, {}, { withCredentials: true });
      console.log(res);
      if (res.status === 200) {
        toast(res.data.message);
      } else {
        toast("Error Occured");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleAllCompletedTask() {
    try {
      const res = await axios.put(`${BASEURL}/api/v1/todo/allcompleted`, {}, { withCredentials: true });
      console.log(res);
      if (res.status === 200) {
        toast(res.data.message);
      } else {
        toast("Error Occured");
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function handleAllCompClear() {
    try {
      const res = await axios.delete(`${BASEURL}/api/v1/todo/allcompclear`, { withCredentials: true });
      console.log(res);
      if (res.status === 200) {
        toast(res.data.message);
      } else {
        toast("Error Occured");
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleBadgeColorChange(color, todoId) {
    try {
      const payload = {
        color: color,
      };
      const res = await axios.patch(`${BASEURL}/api/v1/todo/badge/update/:${todoId}`, { payload }, { withCredentials: true });
      console.log(res);
      if (res.status === 200) {
        toast(res.data.message);
      } else {
        toast("Error Occured");
      }
    } catch (error) {
      console.error(error);
    }
  }
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
                if (e.key === "Enter") {
                  dispatch(todoAdd(todoInput));
                  setTodoInput("");
                  handleAddNewTask();
                }
              }}
            />
          </header>
          <main className=" min-h-3/5">
            <ul className=" px-2  ">
              {todos.map((t, idx) => (
                <li className="flex justify-between my-1" key={idx}>
                  <input
                    type="checkbox"
                    checked={t.completed}
                    onChange={(e) => {
                      dispatch(todoToggled(t));
                      handleMarkCompleteTask(t.id);
                    }}
                  />
                  <p className="min-w-2/3">{t.text}</p>
                  <select
                    className={`outline-none text-sm decorated bg-${t.color}-400`}
                    onChange={(e) => {
                      const color = e.target.value;
                      dispatch(colorSelected({ ...t, color }));
                      handleBadgeColorChange(color, t.id);
                    }}
                  >
                    <option value="Green" className="bg-green-400 ">
                      Green
                    </option>
                    <option value="Blue" className="bg-blue-400">
                      Blue
                    </option>
                    <option value="Orange" className="bg-orange-400">
                      Orange
                    </option>
                    <option value="Purple" className="bg-purple-400">
                      Purple
                    </option>
                    <option value="Red" className="bg-red-400">
                      Red
                    </option>
                  </select>
                  <button
                    className="cursor-pointer"
                    onClick={(e) => {
                      dispatch(todoDeleted(t));
                      handleDeleteTask(t.id);
                    }}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>
            <h2 className="mt-4 font-semibold text-4xl ">Filter Area</h2>
            <div className="max-h-20 overflow-auto">
              {pending.map((val, idx) => (
                <p key={idx}>{val.text}</p>
              ))}
            </div>
          </main>
          <footer className="flex  gap-5 justify-between px-2 border-t-1 border-t-cyan-500 ">
            <div className="flex flex-col gap-2">
              <span className="justify-center flex">Actions</span>
              <button
                className="bg-blue-400 border-1 rounded-sm p-1 text-sm"
                onClick={(e) => {
                  dispatch(allCompleted());
                  handleAllCompletedTask();
                }}
              >
                Mark All Completed
              </button>
              <button
                className="bg-blue-400 border-1 rounded-sm p-1 text-sm"
                onClick={(e) => {
                  dispatch(completedCleared());
                  handleAllCompClear();
                }}
              >
                Clear Completed
              </button>
            </div>
            <div className="flex flex-col">
              <span>Remaining Todos</span>
              <p className="text-sm text-center mt-2">{pending.length}</p>
            </div>
            <div className="flex flex-col">
              <span>Filter by status</span>
              {/* dipatches are not working as expected */}
              {/* <button className="text-sm" onClick={(e) => dispatch(statusFilterChanged("all"))}>
                All
              </button>
              <button className="text-sm" onClick={(e) => dispatch(statusFilterChanged("active"))}>
                Active
              </button>
              <button className="text-sm" onClick={(e) => dispatch(statusFilterChanged("completed"))}>
                Completed
              </button> */}
              <button className="text-sm" onClick={(e) => setFilter("all")}>
                All
              </button>
              <button className="text-sm" onClick={(e) => setFilter("active")}>
                Active
              </button>
              <button className="text-sm" onClick={(e) => setFilter("completed")}>
                Completed
              </button>
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
