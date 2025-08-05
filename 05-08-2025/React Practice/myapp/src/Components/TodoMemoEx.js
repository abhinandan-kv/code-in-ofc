import { memo } from "react";

const Todos = ({ todos }) => {
  console.log("child render");
  return (
    <>
      <h2>My Todos</h2>
      {todos.map((todo, index) => {
        return <p key={index}>{todo}</p>;
      })}
    </>
  );
};

export default memo(Todos);


// difference between memo and useMemo is nothing but memo purpose is to optimize a component to re-render and useMemo purpose is to optimize expensive calculations,
// targets of memo is a funcitonal components and useMemo target is funcitions or expressions with in component...
