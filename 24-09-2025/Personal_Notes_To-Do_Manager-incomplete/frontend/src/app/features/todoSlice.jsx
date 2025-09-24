import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    { id: 0, text: "Learn React", completed: true },
    { id: 1, text: "Learn Redux", completed: false, color: "purple" },
    { id: 2, text: "Build something fun!", completed: false, color: "blue" },
  ],
  filters: {
    status: "Active",
    colors: ["red", "blue"],
  },
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

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    todoAdd: (state, action) => {
      console.log(action.payload);
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
      if (todo) {
        todo.color = action.payload.color;
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
    statusFilterChanged: (state, action) => {
      const status = action.payload;
      console.log(status)
      if (status === "completed") {
        const filteredTodo = state.todos.filter((t) => t.completed !== false);
        return filteredTodo;
      } else if (status === "active") {
        const filteredTodo = state.todos.filter((t) => t.completed !== true);
        return filteredTodo;
      } else {
        return state.todos;
      }
    },
  },
});

export const { todoAdd, todoToggled, colorSelected, todoDeleted, allCompleted, completedCleared, statusFilterChanged } = todoSlice.actions;

export default todoSlice.reducer;
