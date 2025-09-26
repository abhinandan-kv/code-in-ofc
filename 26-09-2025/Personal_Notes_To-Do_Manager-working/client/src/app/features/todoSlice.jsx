import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASEURL = import.meta.env.VITE_BACKEND_URL;

const initialState = {
  todos: [{ id: 0, text: "Learn React", completed: true }],
  filters: {
    status: "Active", //All || Completed
    colors: ["red", "blue", "green", "orange", "purple"],
  },
  status: "idle",
  error: null,
};

// {type: 'todos/todoAdded', payload: todoText}
// {type: 'todos/todoToggled', payload: todoId}
// {type: 'todos/colorSelected', payload: {todoId, color}}
// {type: 'todos/todoDeleted', payload: todoId}
// {type: 'todos/allCompleted'}
// {type: 'todos/completedCleared'}
// {type: 'filters/statusFilterChanged', payload: filterValue}
// {type: 'filters/colorFilterChanged', payload: {color, changeType}}

function nextTodoId(todo) {
  const nextId = todo.length + 1;
  return nextId;
}

export const fetchTodo = createAsyncThunk("todo/fetchTodo", async () => {
  const response = await axios.get(`${BASEURL}/api/v1/todo/get`, { withCredentials: true }); // can use axios over here
  console.log(response);
  return await response.json();
});

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    todoAdd: (state, action) => {
      // console.log(action.payload);
      //   state.todos.push = action.payload;           <- could have used this method as its for mordern redux
      return { ...state, todos: [...state.todos, { id: nextTodoId(state.todos), text: action.payload, completed: false }] }; //  <----- This is how traditional redux used to handle
    },
    todoToggled: (state, action) => {
      //   console.log(state.todos);
      //   return {
      //     ...state,
      //     todos: state.todos.map((todo) => {
      //       console.log(action.payload);
      //       console.log(todo.id);

      //       return {
      //         ...todo,
      //         completed: !completed,
      //       };
      //     }),
      //   };

      const todoId = action.payload.id;
      const todo = state.todos.find((t) => t.id === todoId);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    colorSelected: (state, action) => {
      const todoId = action.payload.id;
      const todo = state.todos.find((t) => t.id === todoId);
      const color = action.payload.color;
      const toLowerCaseColor = color.toLowerCase();
      if (todo) {
        todo.color = toLowerCaseColor;
      }
    },
    todoDeleted: (state, action) => {
      const todoId = action.payload.id;
      const newTodo = state.todos.filter((t) => t.id !== todoId);
      state.todos = newTodo;
    },
    allCompleted: (state, action) => {
      const updatedTodo = state.todos.map((t) => ({ ...t, completed: true }));
      state.todos = updatedTodo;
    },
    completedCleared: (state, action) => {
      const updatedTodo = state.todos.filter((t) => t.completed !== true);
      state.todos = updatedTodo;
    },
    
    // statusFilterChanged: (state, action) => {
    //   const status = action.payload;
    //   console.log(status);
    //   if (status == "completed") {
    //     // const filteredTodo = state.todos.filter((t) => t.completed !== false);
    //     const filteredTodo = state.todos.filter((t) => t.completed);
    //     return { todos: filteredTodo };
    //   } else if (status == "active") {
    //     // const filteredTodo = state.todos.filter((t) => t.completed !== true);
    //     // console.log(state.todos);
    //     // console.log(filteredTodo);
    //     // return filteredTodo;
    //     return state.todos.filter((t) => t.completed);
    //   } else {
    //     return state.todos;
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.status = "success";
        console.log(state)
        console.log(action.payload);
        state.todos = action.payload;
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { todoAdd, todoToggled, colorSelected, todoDeleted, allCompleted, completedCleared, statusFilterChanged } =
  todoSlice.actions;

export default todoSlice.reducer;
