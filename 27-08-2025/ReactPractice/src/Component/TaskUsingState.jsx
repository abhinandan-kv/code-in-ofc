// import React, { useState } from "react";

// let nextId = 3;
// const initialTasks = [
//   { id: 0, text: "Visit Kafka Museum", done: true },
//   { id: 1, text: "Watch a puppet show", done: false },
//   { id: 2, text: "Lennon Wall pic", done: false },
// ];

// const TaskUsingState = () => {
//   const [tasks, setTasks] = useState(initialTasks);

//   function handleAddTask(text) {
//     setTasks([
//       ...tasks,
//       {
//         id: nextId++,
//         text: text,
//         done: false,
//       },
//     ]);
//   }

//   function handleChangeTask(task) {
//     setTasks(() => {
//       tasks.map((t) => {
//         if (t.id === task.id) {
//           return task;
//         } else {
//           return t;
//         }
//       });
//     });
//   }

//   function handleRemoveTask(taskId) {
//     setTasks(tasks.filter((t) => t.id !== taskId));
//   }

//   return (
//     <>
//       <h1>Task app using states</h1>
//       <AddTask onTaskAdd={handleAddTask} />
//       <TaskList tasks={tasks} onChangeTask={handleChangeTask} onDeleteTask={handleRemoveTask} />
//     </>
//   );
// };

// export default TaskUsingState;

// const AddTask = ({ onTaskAdd }) => {
//   const [addTask, setAddTask] = useState("");

//   return (
//     <>
//       <input type="text" onChange={(e) => setAddTask(e.target.value)} value={addTask} />
//       <button
//         onClick={() => {
//           setAddTask("");
//           onTaskAdd(addTask);
//         }}
//       >
//         Add
//       </button>
//     </>
//   );
// };

// const TaskList = ({ tasks, onChangeTask, onDeleteTask }) => {
//   return (
//     <>
//       <ul>
//         {tasks.map((val) => (
//           <li key={val.id} style={{ listStyle: "none" }}>
//             <Tasks task={val} onChange={onChangeTask} onDelete={onDeleteTask} />
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// };
// const Tasks = ({ task, onChange, onDelete }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   let taskContent;
//   if (isEditing) {
//     taskContent = (
//       <>
//         <input
//           value={task.text}
//           onChange={(e) => {
//             onChange({ ...task, text: e.target.value });
//           }}
//         />
//         <button onClick={() => setIsEditing(false)}>Edit</button>
//       </>
//     );
//   } else {
//     taskContent = (
//       <>
//         {task.text}
//         <button onClick={() => setIsEditing(true)}>Edit</button>
//       </>
//     );
//   }

//   return (
//     <>
//       <label>
//         <input
//           type="checkbox"
//           checked={task.done}
//           onChange={(e) => {
//             onChange({ ...task, done: e.target.checked });
//           }}
//         />
//         {taskContent}
//         <button onClick={() => onDelete(task.id)}>Delete</button>
//       </label>
//     </>
//   );
// };
